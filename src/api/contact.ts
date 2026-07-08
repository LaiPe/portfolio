import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { Resend } from "resend";

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Gatsby Function : reçoit le formulaire de contact et l'envoie via Resend.
 * Requiert RESEND_API_KEY (et optionnellement RESEND_FROM_EMAIL) en variable
 * d'environnement côté hébergeur — voir .env.example.
 */
export default async function handler(
  req: GatsbyFunctionRequest<ContactBody>,
  res: GatsbyFunctionResponse,
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !message) {
    res.status(400).json({ error: "Nom, email et message sont requis." });
    return;
  }
  if (!EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: "Adresse email invalide." });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Léo Peyronnet <${fromEmail}>`,
      to: "peyronnet.leo@gmail.com",
      replyTo: email,
      subject: `Contact Portfolio - ${subject || "Nouveau message"}`,
      text: [
        `Nom: ${name}`,
        `Email: ${email}`,
        `Sujet: ${subject || "Non spécifié"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      res.status(502).json({ error: "Échec de l'envoi du message." });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact function error:", error);
    res.status(500).json({ error: "Échec de l'envoi du message." });
  }
}
