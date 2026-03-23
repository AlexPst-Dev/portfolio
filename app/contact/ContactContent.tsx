/**
 * SEO note:
 * This client component keeps the interactive contact form logic isolated.
 * The route-level metadata is defined in `app/contact/page.tsx` for server-side SEO.
 */
"use client";

import { useState } from "react";
import { TbSend } from "react-icons/tb";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Form submitted:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus({
        success: true,
        message:
          "Votre message a ete envoye avec succes ! Je vous repondrai des que possible.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus({
        success: false,
        message:
          "Une erreur est survenue lors de l'envoi du message. Veuillez reessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-label="Prise de contact" className="py-12">
      <header>
        <h1 className="text-3xl font-bold mb-8">ME CONTACTER</h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <section
          aria-label="Formulaire de contact"
          className="bg-neutral-900 p-6 rounded-lg shadow-lg border border-gray-800 max-w-4xl"
        >
          <p className="mb-6 text-gray-300">
            Vous avez un projet en tete ou une question ? N&apos;hesitez pas a
            me contacter en remplissant le formulaire ci-dessous. Je vous
            repondrai dans les plus brefs delais.
          </p>

          {submitStatus && (
            <div
              className={`p-4 mb-6 rounded ${
                submitStatus.success
                  ? "bg-green-900 text-green-100"
                  : "bg-red-900 text-red-100"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-neutral-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-neutral-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-neutral-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Decrivez votre projet ou votre demande..."
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                <TbSend className="w-5 h-5" />
              </button>
            </div>
          </form>
        </section>

        <aside className="text-center text-gray-400 text-sm flex flex-col items-center lg:items-start">
          <h2 className="sr-only">Email professionnel</h2>
          <p>Ou contactez-moi directement a :</p>
          <p className="mt-2">
            <a
              href="mailto:alexandre-proust.dev@proton.me"
              className="text-blue-400 hover:underline"
            >
              alexandre-proust.dev@proton.me
            </a>
          </p>
        </aside>
      </div>
    </section>
  );
}
