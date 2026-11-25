"use client";

import { useEffect } from "react";

import { absoluteUrl, siteName } from "@/features/site";

type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations?: { readOnlyHint?: boolean };
  execute: (
    input: Record<string, unknown>,
    options: { signal: AbortSignal },
  ) => Promise<string> | string;
};

type ModelContext = {
  registerTool: (tool: Tool, options: { signal: AbortSignal }) => unknown;
};

type Post = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
};

type WebMcpProps = {
  posts: Post[];
  pages: string[];
  contact: { email: string; links: { label: string; href: string }[] };
};

const noInput = { type: "object", properties: {} };

export function pageMarkdown(llmsFull: string, uri: string) {
  const line = `URL: ${absoluteUrl(uri)}`;
  return llmsFull
    .split("\n\n---\n\n")
    .find((doc) => doc.split("\n").includes(line));
}

export function mailtoUrl(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function WebMcp({ posts, pages, contact }: WebMcpProps) {
  useEffect(() => {
    const context =
      (document as { modelContext?: ModelContext }).modelContext ??
      (navigator as { modelContext?: ModelContext }).modelContext;
    if (!context) return;

    const tools: Tool[] = [
      {
        name: "list_posts",
        description: `List ${siteName}'s blog posts with their slug, title, description, and publish date.`,
        inputSchema: noInput,
        annotations: { readOnlyHint: true },
        execute: () => JSON.stringify(posts),
      },
      {
        name: "get_post",
        description:
          "Get the full text of one blog post as Markdown. Use a slug from list_posts.",
        inputSchema: {
          type: "object",
          properties: {
            slug: { type: "string", enum: posts.map(({ slug }) => slug) },
          },
          required: ["slug"],
        },
        annotations: { readOnlyHint: true },
        execute: async ({ slug }, { signal }) => {
          if (!posts.some((post) => post.slug === slug)) {
            return `No post with the slug "${String(slug)}".`;
          }
          const response = await fetch(`/posts/${slug}/md`, { signal });
          return response.ok
            ? response.text()
            : `The post could not be loaded (${response.status}).`;
        },
      },
      {
        name: "get_page",
        description: `Get the full text of a page on ${siteName}'s site as Markdown. The homepage has his background, work, and projects.`,
        inputSchema: {
          type: "object",
          properties: {
            uri: {
              type: "string",
              enum: pages,
              description: "The page's path.",
            },
          },
          required: ["uri"],
        },
        annotations: { readOnlyHint: true },
        execute: async ({ uri }, { signal }) => {
          if (typeof uri !== "string" || !pages.includes(uri)) {
            return `No page at "${String(uri)}".`;
          }
          const response = await fetch("/llms-full.txt", { signal });
          if (!response.ok) {
            return `The page could not be loaded (${response.status}).`;
          }
          return (
            pageMarkdown(await response.text(), uri) ??
            "The page could not be loaded."
          );
        },
      },
      {
        name: "get_contact",
        description: `Get ${siteName}'s email address and profile links.`,
        inputSchema: noInput,
        annotations: { readOnlyHint: true },
        execute: () => JSON.stringify(contact),
      },
      {
        name: "draft_email",
        description: `Open a new email to ${siteName} in the visitor's mail app, with the subject and message filled in. Nothing is sent: the visitor reviews and sends it.`,
        inputSchema: {
          type: "object",
          properties: {
            subject: { type: "string", description: "The email's subject." },
            body: { type: "string", description: "The message." },
          },
          required: ["subject", "body"],
        },
        annotations: { readOnlyHint: false },
        execute: ({ subject, body }) => {
          if (typeof subject !== "string" || typeof body !== "string") {
            return "Pass a subject and a message.";
          }
          location.assign(mailtoUrl(contact.email, subject, body));
          return `Opened an email draft to ${contact.email}. It is only sent once the visitor sends it.`;
        },
      },
    ];

    const controller = new AbortController();
    for (const tool of tools) {
      Promise.resolve(
        context.registerTool(tool, { signal: controller.signal }),
      ).catch(() => {});
    }
    return () => controller.abort();
  }, [posts, pages, contact]);

  return null;
}
