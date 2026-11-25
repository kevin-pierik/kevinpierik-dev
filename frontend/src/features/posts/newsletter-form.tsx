"use client";

import { Button } from "@ui-sdk/react/button";
import { Field, FieldError, FieldLabel } from "@ui-sdk/react/field";
import { Input, InputClear, InputGroup } from "@ui-sdk/react/input";
import Script from "next/script";
import { useEffect, useRef, useState, useTransition } from "react";

import { focus, Link } from "@/components/link";
import { subscribe, type SubscribeState } from "@/features/posts/subscribe";

type Turnstile = {
  render: (container: HTMLElement, options: object) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

type AgentSubmitEvent = SubmitEvent & {
  agentInvoked?: boolean;
  respondWith?: (result: Promise<string>) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const messages = {
  idle: "",
  done: "Check your inbox to confirm your subscription.",
  error: "Something went wrong. Try again.",
};

export function NewsletterForm() {
  const [state, setState] = useState<SubscribeState>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const form = useRef<HTMLFormElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string>(undefined);

  function renderWidget() {
    if (!window.turnstile || !container.current || widget.current) return;
    widget.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      theme: "auto",
      appearance: "interaction-only",
    });
  }

  useEffect(
    () => () => {
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = undefined;
    },
    [],
  );

  useEffect(() => {
    if (state.status === "done") form.current?.reset();
    if (state.status !== "idle" && widget.current) {
      window.turnstile?.reset(widget.current);
    }
  }, [state]);

  if (!siteKey) return null;

  return (
    <section aria-labelledby="newsletter-title">
      <Script
        onReady={renderWidget}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const result = new Promise<string>((resolve) =>
            startTransition(async () => {
              const next = await subscribe(state, data).catch(
                (): SubscribeState => ({ status: "error" }),
              );
              startTransition(() => setState(next));
              resolve(messages[next.status]);
            }),
          );
          const submit = event.nativeEvent as AgentSubmitEvent;
          if (submit.agentInvoked) submit.respondWith?.(result);
        }}
        ref={form}
        {...{
          toolname: "subscribe_to_newsletter",
          tooldescription:
            "Subscribe an email address to new posts on kevinpierik.dev. The person reviews the address and presses Subscribe themselves.",
        }}
      >
        <Field className="grid gap-[0.5lh]" name="email">
          <h2 className="font-medium" id="newsletter-title">
            <FieldLabel>Get new posts by email</FieldLabel>
          </h2>
          <div className="flex gap-2">
            <InputGroup className="flex min-h-9 min-w-0 flex-1 items-center border border-control bg-background has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring pointer-coarse:min-h-11">
              <Input
                autoComplete="email"
                className="h-full min-w-0 flex-1 bg-transparent px-3 outline-none placeholder:text-muted pointer-coarse:text-base"
                enterKeyHint="send"
                placeholder="you@example.com"
                required
                spellCheck={false}
                {...{
                  toolparamdescription:
                    "The email address that receives new posts, such as you@example.com.",
                }}
                type="email"
              />
              <InputClear
                aria-label="Clear email"
                className={`mr-1 inline-flex size-7 items-center justify-center text-muted transition-colors hover:text-foreground ${focus}`}
              >
                <svg
                  aria-hidden="true"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </InputClear>
            </InputGroup>
            <Button
              className={`inline-flex min-h-9 items-center bg-subtle px-4 transition-colors hover:bg-subtle-hover data-disabled:cursor-wait pointer-coarse:min-h-11 ${focus}`}
              disabled={pending}
              focusableWhenDisabled
              type="submit"
            >
              Subscribe
            </Button>
          </div>
          <FieldError className="text-muted" match="valueMissing">
            Enter your email address.
          </FieldError>
          <FieldError className="text-muted" match="typeMismatch">
            Enter an email address like you@example.com.
          </FieldError>
        </Field>
        <div className="mt-[0.5lh] empty:hidden" ref={container} />
        <p className="mt-[0.5lh] text-muted" role="status">
          {state.status === "idle" ? (
            <>
              Unsubscribe anytime. See the{" "}
              <Link href="/privacy">privacy policy</Link>.
            </>
          ) : (
            messages[state.status]
          )}
        </p>
      </form>
    </section>
  );
}
