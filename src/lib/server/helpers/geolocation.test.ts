import { describe, expect, it } from "vitest";
import { getClientIP } from "./geolocation";

function headersOf(entries: Record<string, string>) {
  return new Headers(entries);
}

describe("getClientIP", () => {
  it("prefers x-forwarded-for and takes the first hop", () => {
    expect(
      getClientIP(
        headersOf({
          "x-forwarded-for": "203.0.113.9, 70.41.3.18, 150.172.238.178",
          "x-real-ip": "10.0.0.1",
        }),
      ),
    ).toBe("203.0.113.9");
  });

  it("falls back to x-real-ip", () => {
    expect(getClientIP(headersOf({ "x-real-ip": "198.51.100.7" }))).toBe(
      "198.51.100.7",
    );
  });

  it("falls back to cf-connecting-ip, then x-client-ip", () => {
    expect(getClientIP(headersOf({ "cf-connecting-ip": "192.0.2.5" }))).toBe(
      "192.0.2.5",
    );
    expect(getClientIP(headersOf({ "x-client-ip": "192.0.2.6" }))).toBe(
      "192.0.2.6",
    );
  });

  it("returns loopback when no header is present", () => {
    expect(getClientIP(headersOf({}))).toBe("127.0.0.1");
  });
});
