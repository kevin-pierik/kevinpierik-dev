import { expect, test } from "@playwright/test";

test("the English homepage renders", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Kevin Pierik Frontend Developer",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\/www\.kevinpierik\.dev\/?$/,
  );
});

test("the posts index handles empty content and opens published posts", async ({
  page,
}) => {
  await page.goto("/posts");

  await expect(
    page.getByRole("heading", { level: 1, name: "Posts" }),
  ).toBeVisible();
  const articleLink = page
    .getByRole("list", { name: "Posts" })
    .getByRole("link")
    .first();
  if ((await articleLink.count()) === 0) {
    await expect(page.getByText("No posts yet.")).toBeVisible();
    return;
  }

  await expect(articleLink).toBeVisible();
  await articleLink.click();

  await expect(page).toHaveURL(/\/posts\/[^/]+$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("main time")).toHaveAttribute("datetime", /.+/);
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      "{}",
  );
  expect(
    structuredData["@graph"].map((node: { "@type": string }) => node["@type"]),
  ).toContain("BlogPosting");
});

test("unknown content returns a noindex 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /^Page not found$/,
  );
  const robotsDirectives = await page
    .locator('meta[name="robots"]')
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("content") ?? ""),
    );
  expect(robotsDirectives.some((content) => content.includes("noindex"))).toBe(
    true,
  );
});

test("public discovery endpoints return canonical content", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  const feed = await request.get("/feed.xml");
  const robots = await request.get("/robots.txt");

  expect(sitemap.ok()).toBeTruthy();
  const urls = (await sitemap.text()).match(/(?<=<loc>)[^<]+/g) ?? [];
  expect(urls).toContain("https://www.kevinpierik.dev");
  expect(urls).toEqual([...new Set(urls)]);
  expect(feed.ok()).toBeTruthy();
  expect(await feed.text()).toContain("<rss");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Disallow: /api/");
});
