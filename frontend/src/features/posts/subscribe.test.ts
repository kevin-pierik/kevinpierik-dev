import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { subscribe } from "./subscribe";

const idle = { status: "idle" } as const;

function form(email: string, token = "token") {
  const data = new FormData();
  data.set("email", email);
  data.set("cf-turnstile-response", token);
  return data;
}

function mockFetch(turnstile: boolean, klaviyoStatus = 202) {
  const fetch = vi.fn(async (url: string) =>
    url.includes("turnstile")
      ? Response.json({ success: turnstile })
      : new Response(null, { status: klaviyoStatus }),
  );
  vi.stubGlobal("fetch", fetch);
  return fetch;
}

describe("subscribe", () => {
  beforeEach(() => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    vi.stubEnv("KLAVIYO_PRIVATE_KEY", "pk_test");
    vi.stubEnv("KLAVIYO_LIST_ID", "LIST1");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  test("rejects an invalid email without calling anything", async () => {
    const fetch = mockFetch(true);
    expect(await subscribe(idle, form("not-an-email"))).toEqual({
      status: "error",
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  test("rejects a missing Turnstile token", async () => {
    const fetch = mockFetch(true);
    expect(await subscribe(idle, form("a@b.co", ""))).toEqual({
      status: "error",
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  test("never calls Klaviyo when Turnstile fails", async () => {
    const fetch = mockFetch(false);
    expect(await subscribe(idle, form("a@b.co"))).toEqual({ status: "error" });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("reports an error when Klaviyo rejects the request", async () => {
    mockFetch(true, 400);
    expect(await subscribe(idle, form("a@b.co"))).toEqual({ status: "error" });
  });

  test("subscribes the email to the list", async () => {
    const fetch = mockFetch(true);
    expect(await subscribe(idle, form(" a@b.co "))).toEqual({
      status: "done",
    });

    const [, verify] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(verify.body as string)).toEqual({
      secret: "secret",
      response: "token",
    });

    const [url, init] = fetch.mock.calls[1] as unknown as [string, RequestInit];
    expect(url).toBe(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
    );
    expect(init.headers).toMatchObject({
      authorization: "Klaviyo-API-Key pk_test",
      revision: "2026-10-15",
    });
    const { data } = JSON.parse(init.body as string);
    expect(data.attributes.profiles.data[0].attributes).toEqual({
      email: "a@b.co",
      subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
    });
    expect(data.relationships.list.data).toEqual({ type: "list", id: "LIST1" });
  });
});
