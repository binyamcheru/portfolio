import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Binyam Cheru — Full-Stack Systems Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "80px",
                    background: "linear-gradient(135deg, #0B0118 0%, #1a0533 50%, #0B0118 100%)",
                    fontFamily: "system-ui, sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative circles */}
                <div
                    style={{
                        position: "absolute",
                        top: "-120px",
                        right: "-120px",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
                        display: "flex",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-80px",
                        left: "-80px",
                        width: "350px",
                        height: "350px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
                        display: "flex",
                    }}
                />

                {/* Top bar */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "48px",
                    }}
                >
                    <div
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: "#A855F7",
                            display: "flex",
                        }}
                    />
                    <span
                        style={{
                            fontSize: "16px",
                            color: "rgba(255,255,255,0.3)",
                            letterSpacing: "4px",
                            textTransform: "uppercase",
                            fontWeight: 700,
                        }}
                    >
                        Portfolio — v1.0.0
                    </span>
                </div>

                {/* Name */}
                <div
                    style={{
                        fontSize: "72px",
                        fontWeight: 800,
                        color: "#FFFFFF",
                        lineHeight: 1.1,
                        letterSpacing: "-2px",
                        marginBottom: "16px",
                        display: "flex",
                    }}
                >
                    Binyam Cheru
                </div>

                {/* Title badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "40px",
                    }}
                >
                    <div
                        style={{
                            padding: "8px 20px",
                            borderRadius: "6px",
                            background: "rgba(168,85,247,0.1)",
                            border: "1px solid rgba(168,85,247,0.3)",
                            fontSize: "20px",
                            fontWeight: 700,
                            color: "#A855F7",
                            display: "flex",
                        }}
                    >
                        Full-Stack Systems Architect
                    </div>
                </div>

                {/* Description */}
                <div
                    style={{
                        fontSize: "22px",
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.5,
                        maxWidth: "700px",
                        display: "flex",
                    }}
                >
                    Building testable, scalable, and documented web applications.
                </div>

                {/* Bottom tech tags */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "60px",
                        left: "80px",
                        display: "flex",
                        gap: "16px",
                    }}
                >
                    {["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"].map(
                        (tag) => (
                            <div
                                key={tag}
                                style={{
                                    padding: "6px 16px",
                                    borderRadius: "4px",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    fontSize: "14px",
                                    color: "rgba(255,255,255,0.35)",
                                    fontWeight: 600,
                                    display: "flex",
                                }}
                            >
                                {tag}
                            </div>
                        )
                    )}
                </div>

                {/* URL in bottom-right */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "60px",
                        right: "80px",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.2)",
                        fontWeight: 600,
                        display: "flex",
                    }}
                >
                    binyam-cheru.vercel.app
                </div>
            </div>
        ),
        { ...size }
    );
}
