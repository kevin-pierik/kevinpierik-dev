"use server";

export type SubscribeState = { status: "idle" | "done" | "error" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function verifyTurnstile(token: string) {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    },
  );
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function subscribeToList(email: string) {
  const response = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
    {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
        authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`,
        revision: "2026-10-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            custom_source: "kevinpierik.dev",
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: { marketing: { consent: "SUBSCRIBED" } },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: { data: { type: "list", id: process.env.KLAVIYO_LIST_ID } },
          },
        },
      }),
    },
  );
  return response.status === 202;
}

export async function subscribe(
  _state: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();
  const token = String(formData.get("cf-turnstile-response") ?? "");

  if (!emailPattern.test(email) || !token) return { status: "error" };

  try {
    if (!(await verifyTurnstile(token))) return { status: "error" };
    return { status: (await subscribeToList(email)) ? "done" : "error" };
  } catch {
    return { status: "error" };
  }
}
