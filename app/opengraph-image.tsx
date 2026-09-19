import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const iconPath = path.join(process.cwd(), "app", "icon.png");
  const iconBase64 = fs.readFileSync(iconPath).toString("base64");
  const iconSrc = `data:image/png;base64,${iconBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          padding: 90,
          background:
            "linear-gradient(135deg, #05070c 0%, #0b0d12 55%, #12172a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={iconSrc}
          alt=""
          width={240}
          height={240}
          style={{ borderRadius: 40, flexShrink: 0 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 760,
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#5b8cff",
              marginBottom: 18,
            }}
          >
            A Study Companion
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.12,
              color: "#e8eaed",
            }}
          >
            Software Architecture Foundations
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              lineHeight: 1.4,
              color: "#8b929e",
            }}
          >
            Learn how systems are structured, how components communicate,
            and how architectures evolve as they scale.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
