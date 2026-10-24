import { beforeEach, describe, expect, it, vi } from "vitest";

const WEBHOOK = "https://discord.com/api/webhooks/123/token";

const payload = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Freelance project",
  message: "Hi there, I would like a quote.",
  ip: "203.0.113.9",
};

/** Reads the embed the service built, from the last fetch call. */
function lastEmbed() {
  const call = vi.mocked(global.fetch).mock.calls.at(-1);
  return JSON.parse(String(call?.[1]?.body)).embeds[0];
}

async function loadService() {
  vi.resetModules();
  const { notifyNewContactForm } = await import(
    "./discord" satisfies string
  );
  return notifyNewContactForm;
}

describe("notifyNewContactForm", () => {
  beforeEach(() => {
    vi.stubEnv("DISCORD_WEBHOOK_URL", WEBHOOK);
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      statusText: "No Content",
    }) as unknown as typeof fetch;
  });

  it("posts the form fields to the configured webhook", async () => {
    const notify = await loadService();
    await notify(payload);

    expect(global.fetch).toHaveBeenCalledOnce();
    const [url, init] = vi.mocked(global.fetch).mock.calls[0];
    expect(url).toBe(WEBHOOK);
    expect(init?.method).toBe("POST");
    expect((init?.headers as Record<string, string>)["Content-Type"]).toBe(
      "application/json",
    );

    const embed = lastEmbed();
    const fields = Object.fromEntries(
      embed.fields.map((f: { name: string; value: string }) => [f.name, f.value]),
    );
    expect(fields.Email).toBe("ada@example.com");
    expect(fields.Subject).toBe("Freelance project");
    expect(fields.IP).toBe("203.0.113.9");
    expect(embed.description).toBe("Hi there, I would like a quote.");
  });

  it("renders the sender as a mailto link so it can be replied to", async () => {
    const notify = await loadService();
    await notify(payload);

    const from = lastEmbed().fields.find(
      (f: { name: string }) => f.name === "From",
    );
    expect(from.value).toBe(
      "[Ada Lovelace](mailto:ada@example.com?subject=Re%3A%20Freelance%20project)",
    );
  });

  it("truncates the message to Discord's description limit", async () => {
    const notify = await loadService();
    await notify({ ...payload, message: "x".repeat(6000) });

    const description = lastEmbed().description;
    expect(description.length).toBeLessThanOrEqual(4096);
    expect(description.endsWith("…")).toBe(true);
  });

  it("truncates an over-long field value", async () => {
    const notify = await loadService();
    await notify({ ...payload, subject: "s".repeat(2000) });

    const subject = lastEmbed().fields.find(
      (f: { name: string }) => f.name === "Subject",
    );
    expect(subject.value.length).toBeLessThanOrEqual(1024);
  });

  it("throws on a non-2xx response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    }) as unknown as typeof fetch;

    const notify = await loadService();
    await expect(notify(payload)).rejects.toThrow(/404/);
  });

  it("skips the request and warns when the webhook is not configured", async () => {
    vi.stubEnv("DISCORD_WEBHOOK_URL", "");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const notify = await loadService();
    await notify(payload);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
  });
});

/**
 * Regression: the sender name is attacker-controlled and Discord renders embed
 * values as markdown. Without escaping, a crafted name can break out of the
 * mailto link and point the reader at an arbitrary URL.
 */
describe("notifyNewContactForm markdown injection", () => {
  beforeEach(() => {
    vi.stubEnv("DISCORD_WEBHOOK_URL", WEBHOOK);
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      statusText: "No Content",
    }) as unknown as typeof fetch;
  });

  it("cannot hijack the reply link via the sender name", async () => {
    const notify = await loadService();
    await notify({
      ...payload,
      fullName: "](https://evil.example/steal)[",
    });

    const from = lastEmbed().fields.find(
      (f: { name: string }) => f.name === "From",
    );

    // The only link target must be the mailto, never the injected URL.
    expect(from.value).toContain("](mailto:ada@example.com");
    expect(from.value).not.toMatch(/\]\(https:\/\/evil\.example/);
  });

  it("escapes markdown metacharacters in the subject", async () => {
    const notify = await loadService();
    await notify({ ...payload, subject: "[x](javascript:alert(1)) **bold**" });

    const subject = lastEmbed().fields.find(
      (f: { name: string }) => f.name === "Subject",
    );
    expect(subject.value).not.toContain("](javascript:");
    expect(subject.value).toContain("\\[x\\]");
  });
});
