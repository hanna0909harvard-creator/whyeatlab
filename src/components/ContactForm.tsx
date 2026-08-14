"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="text-lg text-neutral-800">
        Thank you for reaching out. We&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-neutral-600">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="border-b border-neutral-300 bg-transparent py-2 outline-none focus:border-sage-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-neutral-600">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border-b border-neutral-300 bg-transparent py-2 outline-none focus:border-sage-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-neutral-600">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="resize-none border-b border-neutral-300 bg-transparent py-2 outline-none focus:border-sage-600"
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-neutral-900 px-6 py-2.5 text-sm text-white transition-colors hover:bg-sage-700"
      >
        Send
      </button>
    </form>
  );
}
