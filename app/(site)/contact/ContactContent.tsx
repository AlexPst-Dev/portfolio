/**
 * SEO note:
 * This client component keeps the interactive contact form logic isolated.
 * The route-level metadata is defined in `app/contact/page.tsx` for server-side SEO.
 */
"use client";

import { useActionState } from "react";
import { TbSend } from "react-icons/tb";
import { sendContactMessage, type ContactState } from "./actions";

const CONTACT_EMAIL = "alexandre-proust.dev@proton.me";

const initialState: ContactState = { status: "idle", message: "" };

const inputClass =
  "w-full px-4 py-2 rounded bg-neutral-800 border border-gray-600 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent aria-[invalid=true]:border-red-500";

export default function ContactContent() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState,
  );
  const errors = state.fieldErrors ?? {};
  const values = state.values;

  return (
    <section aria-label="Prise de contact" className="py-12">
      <header>
        <h1 className="text-3xl font-bold mb-8">ME CONTACTER</h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <section
          aria-label="Formulaire de contact"
          className="bg-neutral-900 p-4 rounded-lg shadow-lg border border-gray-800 max-w-4xl"
        >
          <p className="mb-6 text-gray-300">
            Vous avez un projet en tête ou une question ? N&apos;hésitez pas à
            me contacter en remplissant le formulaire ci-dessous. Je vous
            répondrai dans les plus brefs délais.
          </p>

          <div aria-live="polite">
            {state.status !== "idle" && (
              <div
                role={state.status === "error" ? "alert" : "status"}
                className={`p-4 mb-6 rounded ${
                  state.status === "success"
                    ? "bg-green-900 text-green-100"
                    : "bg-red-900 text-red-100"
                }`}
              >
                {state.message}
              </div>
            )}
          </div>

          {/* `key` remounts the fields so defaultValue picks up echoed values after an error */}
          <form
            key={JSON.stringify(values ?? null)}
            action={formAction}
            className="space-y-6"
            noValidate
          >
            {/* Honeypot, hidden from people and assistive tech */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Société</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                defaultValue={values?.name}
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass}
                placeholder="Votre nom"
              />
              {errors.name && (
                <span id="name-error" className="block mt-1 text-sm text-red-400">{errors.name}</span>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                defaultValue={values?.email}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <span id="email-error" className="block mt-1 text-sm text-red-400">{errors.email}</span>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                defaultValue={values?.message}
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={inputClass}
                placeholder="Décrivez votre projet ou votre demande..."
              />
              {errors.message && (
                <span id="message-error" className="block mt-1 text-sm text-red-400">{errors.message}</span>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? "Envoi en cours..." : "Envoyer le message"}
                <TbSend className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>

        <aside className="text-center text-gray-400 text-sm flex flex-col items-center lg:items-start">
          <h2 className="sr-only">Email professionnel</h2>
          <p>Ou contactez-moi directement à :</p>
          <p className="mt-2">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-400 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </aside>
      </div>
    </section>
  );
}
