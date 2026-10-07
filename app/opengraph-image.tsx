import { ImageResponse } from "next/og";
import { personaKnowledge } from "@/lib/persona/knowledge";

const { profile, contact } = personaKnowledge;

export const alt = `${profile.displayName} — ${profile.shortTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const host = contact.portfolio.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a0a0c",
          color: "#ededf0",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          backgroundImage:
            "radial-gradient(circle at 50% -20%, rgba(255,255,255,0.14), transparent 50%), linear-gradient(to right, rgba(237,237,240,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,237,240,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 72px 72px, 72px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#9b9ba6", letterSpacing: 2 }}>
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: "#ffffff" }} />
          {host}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 22, color: "#9b9ba6", textTransform: "uppercase", letterSpacing: 5 }}>
            {profile.shortTitle}
          </div>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -4, marginTop: 14, lineHeight: 1 }}>
            {profile.displayName}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#9b9ba6", marginTop: 28, maxWidth: 900, lineHeight: 1.4 }}>
            Next.js · React · Node.js · Django — building web applications in {profile.location}.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
