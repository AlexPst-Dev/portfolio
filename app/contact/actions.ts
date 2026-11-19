"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Echoed back on error so React's automatic form reset doesn't wipe the input. */
  values?: { name: string; email: string; message: string };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never see nor fill this field.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Merci, votre message a bien été envoyé." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (name.length < 2 || name.length > 100) fieldErrors.name = "Indiquez votre nom.";
  if (!EMAIL_PATTERN.test(email) || email.length > 200)
    fieldErrors.email = "Adresse email invalide.";
  if (message.length < 10 || message.length > 5000)
    fieldErrors.message = "Votre message doit faire entre 10 et 5000 caractères.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Merci de corriger les champs indiqués.",
      fieldErrors,
      values: { name, email, message },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return {
      status: "error",
      message:
        "L'envoi est momentanément indisponible. Écrivez-moi directement par email, l'adresse est juste à côté.",
      values: { name, email, message },
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio — nouveau message de ${name}`,
        text: `De : ${name} <${email}>\n\n${message}`,
        html: `<p><strong>De :</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Contact form: Resend responded", response.status, await response.text());
      throw new Error("Resend request failed");
    }
  } catch (error) {
    console.error("Contact form: sending failed", error);
    return {
      status: "error",
      message:
        "Une erreur est survenue lors de l'envoi. Réessayez plus tard ou écrivez-moi directement par email.",
      values: { name, email, message },
    };
  }

  return {
    status: "success",
    message: "Votre message a bien été envoyé ! Je vous réponds dès que possible.",
  };
}
