import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/constants/site";
import { ImageResponse } from "next/og";

export const alt = `${SITE_AUTHOR} | ${SITE_NAME}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "80px",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 25% 15%, #1d4ed833 0%, transparent 45%), radial-gradient(circle at 85% 85%, #2563eb26 0%, transparent 40%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            P
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            {SITE_NAME}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "950px",
            }}
          >
            {SITE_AUTHOR}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              fontWeight: 500,
              color: "#60a5fa",
            }}
          >
            Full Stack Developer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              lineHeight: 1.4,
              color: "#a1a1aa",
              maxWidth: "900px",
            }}
          >
            Building robust, scalable and user-centric web applications.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            color: "#71717a",
            borderTop: "1px solid #27272a",
            paddingTop: "24px",
          }}
        >
          <span>Portfolio</span>
          <span>{SITE_URL.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
