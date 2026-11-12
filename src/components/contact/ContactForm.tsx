"use client";

import { useState, type FormEvent } from "react";

const EMAIL = "jewelramirez.dev@gmail.com";
const field =
  "w-full border border-border bg-background px-4 py-3 text-base sm:text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all placeholder:text-secondary/60";
const label = "mb-2 block text-[11px] font-mono uppercase tracking-widest text-secondary";

// No backend on a static export, so submitting opens the visitor's mail app with the message prefilled.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 pt-2 lg:pl-8" onChange={() => sent && setSent(false)}>
      <div>
        <label htmlFor="contact-name" className={label}>01 / Name</label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={field} />
      </div>
      <div>
        <label htmlFor="contact-email" className={label}>02 / Email</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@example.com" className={field} />
      </div>
      <div>
        <label htmlFor="contact-message" className={label}>03 / Message</label>
        <textarea id="contact-message" name="message" rows={5} required placeholder="What are you building?" className={`${field} resize-none`} />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="group/btn relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden border border-border bg-background px-8 py-3.5 text-xs font-mono font-semibold uppercase tracking-widest text-foreground transition-colors duration-500 ease-out hover:border-foreground hover:text-background focus-visible:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100 motion-reduce:transition-none"
          />
          <span className="relative">SEND MESSAGE</span>
          <span aria-hidden="true" className="relative transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transition-none">→</span>
        </button>

        <div role="status" aria-live="polite" className="mt-4 min-h-[3.25rem]">
          {sent && (
            <p className="border border-border bg-surface px-4 py-3 text-xs font-mono leading-relaxed text-secondary">
              <span className="text-foreground">Your email app should open with this message filled in.</span>{" "}
              Nothing happened? Write to me directly at{" "}
              <a href={`mailto:${EMAIL}`} className="text-foreground underline underline-offset-4 hover:no-underline">
                {EMAIL}
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
