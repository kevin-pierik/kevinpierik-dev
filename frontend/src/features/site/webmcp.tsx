"use client";

import { useEffect } from "react";

import { siteName } from "@/features/site";

type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<string> | string;
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
  contact: { email: string; links: { label: string; href: string }[] };
};

const noInput = { type: "object", properties: {} };

export function WebMcp({ posts, contact }: WebMcpProps) {
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
        execute: async ({ slug }) => {
          if (!posts.some((post) => post.slug === slug)) {
            return `No post with the slug "${String(slug)}".`;
          }
          const response = await fetch(`/posts/${slug}/md`);
          return response.ok
            ? response.text()
            : `The post could not be loaded (${response.status}).`;
        },
      },
      {
        name: "get_contact",
        description: `Get ${siteName}'s email address and profile links.`,
        inputSchema: noInput,
        execute: () => JSON.stringify(contact),
      },
    ];

    const controller = new AbortController();
    for (const tool of tools) {
      Promise.resolve(
        context.registerTool(
          { ...tool, annotations: { readOnlyHint: true } },
          { signal: controller.signal },
        ),
      ).catch(() => {});
    }
    return () => controller.abort();
  }, [posts, contact]);

  return null;
}
