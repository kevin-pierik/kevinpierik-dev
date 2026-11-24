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
  const result = (await response.json()) as {
    success?: boolean;
    "error-codes"?: string[];
  };
  if (result.success !== true) {
    console.error(
      "newsletter: Turnstile rejected the token",
      result["error-codes"],
    );
  }
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
  if (response.status !== 202) {
    console.error(
      `newsletter: Klaviyo answered ${response.status}`,
      (await response.text()).slice(0, 500),
    );
  }
  return response.status === 202;
}

export async function subscribe(
  _state: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();
  const token = String(formData.get("cf-turnstile-response") ?? "");

  if (!emailPattern.test(email) || !token) {
    console.error(
      `newsletter: ${token ? "invalid email address" : "missing Turnstile token"}`,
    );
    return { status: "error" };
  }

  try {
    if (!(await verifyTurnstile(token))) return { status: "error" };
    return { status: (await subscribeToList(email)) ? "done" : "error" };
  } catch (error) {
    console.error("newsletter: request failed", error);
    return { status: "error" };
  }
}
