"use client";

import { useState, type FormEvent } from "react";

const EMAIL = "jewelramirez.dev@gmail.com";
const field =
  "w-full rounded-md border border-border/50 bg-background px-4 py-3 text-base sm:text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all placeholder:text-secondary/60";

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
    <form onSubmit={onSubmit} className="space-y-8 pt-2 lg:pl-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="contact-name" className="sr-only">Name</label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Enter your Name" className={field} />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">Email address</label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="Enter a valid email address" className={field} />
        </div>
        <div>
          <label htmlFor="contact-message" className="sr-only">Message</label>
          <textarea id="contact-message" name="message" rows={4} required placeholder="Enter your message" className={`${field} resize-none`} />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full sm:w-auto rounded bg-foreground px-8 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold text-background hover:opacity-90 transition-opacity"
        >
          <span>SUBMIT</span>
        </button>
        <p role="status" className="mt-3 min-h-4 text-xs font-mono text-secondary">
          {sent ? "Opening your email app to send this message…" : ""}
        </p>
      </div>
    </form>
  );
}
