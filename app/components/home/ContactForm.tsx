"use client";

import { useActionState, useEffect } from "react";
import { Send } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

const FIELDS = ["name", "email", "message"] as const;

const field =
  "w-full rounded-[14px] border-2 border-[#3a3028] bg-[#1d1713] px-4 text-[17px] text-bone transition-colors placeholder:text-[#8f8479] hover:border-[#5a4a3d] focus-visible:border-flame focus-visible:outline-none aria-[invalid=true]:border-[#ff8a5c]";
const label = "mb-2 block font-semibold";
const error = "mt-2 text-[15px] text-[#ffb08f]";

/**
 * Sends through a Server Action, so it also works before JavaScript loads.
 * After an error the fields come back filled and focus goes to the first one to fix.
 */
export default function ContactForm({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const errors = state.fieldErrors ?? {};
  const values = state.values;

  useEffect(() => {
    const first = FIELDS.find((f) => state.fieldErrors?.[f]);
    if (first) document.getElementById(`contact-${first}`)?.focus();
  }, [state]);

  return (
    // React resets the form after each submission; a new key per attempt remounts
    // the fields so their defaultValue (the echoed input) shows again after an error
    <form key={state.attempt ?? 0} action={formAction} noValidate className="grid gap-5">
      {/* Honeypot, out of sight and out of the tab order */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Société</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>
            Votre nom
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            defaultValue={values?.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`${field} min-h-14`}
          />
          {errors.name && (
            <p id="contact-name-error" className={error}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>
            Votre email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={200}
            defaultValue={values?.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`${field} min-h-14`}
          />
          {errors.email && (
            <p id="contact-email-error" className={error}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={label}>
          Votre projet
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          defaultValue={values?.message}
          placeholder="Ce que vous voulez construire, pour qui, et pour quand."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${field} min-h-36 resize-y py-3 leading-relaxed`}
        />
        {errors.message && (
          <p id="contact-message-error" className={error}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-14 items-center gap-2.5 rounded-full bg-flame px-7 text-lg font-semibold text-ink transition-[transform,opacity] hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60"
        >
          {pending ? "Envoi en cours…" : "Envoyer mon projet"}
          <Send size={19} strokeWidth={2.25} className="icon-nudge" aria-hidden />
        </button>
        <p className="text-[15px] text-ash">
          Ou par email :{" "}
          <a href={`mailto:${email}`} className="font-semibold text-bone underline decoration-flame underline-offset-4 hover:text-flame">
            {email}
          </a>
        </p>
      </div>

      {/* Always in the DOM so screen readers announce what appears in it */}
      <div aria-live="polite" aria-atomic="true">
        {state.status !== "idle" && (
          <p
            className={[
              "rounded-[14px] px-4 py-3 font-medium",
              state.status === "success" ? "bg-flame text-ink" : "border-2 border-[#ff8a5c] text-[#ffd2bf]",
            ].join(" ")}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
