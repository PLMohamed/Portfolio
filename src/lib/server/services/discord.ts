import "server-only";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

/** Discord API limits, used to truncate fields safely. */
const MAX_TITLE = 256;
const MAX_FIELD_VALUE = 1024;
const MAX_DESCRIPTION = 4096;

export interface ContactFormNotification {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
}

/**
 * Truncates a string to Discord's maximum length for a given payload field.
 * @param value The string to truncate.
 * @param max The maximum allowed length.
 * @returns The truncated string, with an ellipsis appended if it was cut.
 */
function truncate(value: string, max: number): string {
  if (value.length <= max) return value;

  return `${value.slice(0, max - 1)}…`;
}

/**
 * Escapes Discord markdown characters in user-supplied text.
 * Without this, a crafted name like "](https://evil.example)" can break out of
 * the surrounding link and redirect the reader to an attacker-controlled URL.
 * @param value The untrusted string to escape.
 * @returns The string safe to embed inside markdown.
 */
function escapeMarkdown(value: string): string {
  return value.replace(/([\\*_~`|>[\]()])/g, "\\$1");
}

/**
 * Builds a mailto link so the notification can be replied to directly.
 * @param email The sender address.
 * @param subject The original subject, prefixed with "Re:".
 * @returns A mailto URL string.
 */
function buildMailto(email: string, subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(`Re: ${subject}`)}`;
}

/**
 * Sends a Discord notification for a new contact form submission.
 * This is a fire-and-forget side effect: a non-2xx response is logged and
 * swallowed so that a Discord outage never affects the caller.
 * @param payload The submitted contact form details.
 * @returns Nothing. Resolves once the request to Discord has settled.
 */
export async function notifyNewContactForm(
  payload: ContactFormNotification,
): Promise<void> {
  if (!WEBHOOK_URL) {
    console.warn(
      "DISCORD_WEBHOOK_URL is not set, skipping contact form notification.",
    );
    return;
  }

  const { fullName, email, subject, message, ip } = payload;

  const body = {
    embeds: [
      {
        title: truncate("📨 New contact message", MAX_TITLE),
        color: 0x5865f2,
        fields: [
          {
            name: "From",
            value: truncate(
              `[${escapeMarkdown(fullName)}](${buildMailto(email, subject)})`,
              MAX_FIELD_VALUE,
            ),
            inline: false,
          },
          { name: "Email", value: truncate(email, MAX_FIELD_VALUE) },
          {
            name: "Subject",
            value: truncate(escapeMarkdown(subject), MAX_FIELD_VALUE),
          },
          { name: "IP", value: truncate(ip, MAX_FIELD_VALUE) },
        ],
        description: truncate(message, MAX_DESCRIPTION),
        footer: { text: "Portfolio contact form" },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Discord webhook responded with ${response.status} ${response.statusText}`,
    );
  }
}
