import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/app/lib/content";

// The preview card shown when the site is shared (rendered once, at build time)
export const alt = "Alexandre Proust, product builder et développeur fullstack : il emmène votre idée jusqu'en production, avec l'IA à chaque étape.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

const spark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><path fill="#ff6a13" d="M72.4972 20.2761C75.0744 13.3111 84.9256 13.3111 87.5028 20.276L100.331 54.9428C101.141 57.1326 102.867 58.859 105.057 59.6693L139.724 72.4972C146.689 75.0744 146.689 84.9256 139.724 87.5028L105.057 100.331C102.867 101.141 101.141 102.867 100.331 105.057L87.5028 139.724C84.9256 146.689 75.0744 146.689 72.4972 139.724L59.6693 105.057C58.859 102.867 57.1326 101.141 54.9428 100.331L20.2761 87.5028C13.3111 84.9256 13.3111 75.0744 20.276 72.4972L54.9428 59.6693C57.1326 58.859 58.859 57.1326 59.6693 54.9428L72.4972 20.2761Z"/><ellipse cx="69" cy="80" rx="5.5" ry="10" fill="#0a0806"/><ellipse cx="91" cy="80" rx="5.5" ry="10" fill="#0a0806"/><path fill="#ff6a13" d="M126.249 10.138C127.537 6.65556 132.463 6.65555 133.751 10.138L137.464 20.1723C137.87 21.2672 138.733 22.1304 139.828 22.5356L149.862 26.2486C153.344 27.5372 153.344 32.4628 149.862 33.7514L139.828 37.4644C138.733 37.8696 137.87 38.7328 137.464 39.8277L133.751 49.862C132.463 53.3444 127.537 53.3444 126.249 49.862L122.536 39.8277C122.13 38.7328 121.267 37.8696 120.172 37.4644L110.138 33.7514C106.656 32.4628 106.656 27.5372 110.138 26.2486L120.172 22.5356C121.267 22.1304 122.13 21.2672 122.536 20.1723L126.249 10.138Z"/></svg>`;

export default async function OpengraphImage() {
  const [display, text] = await Promise.all([
    font("unbounded", "unbounded-latin-800-normal.woff"),
    font("hanken-grotesk", "hanken-grotesk-latin-500-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0a0806",
          color: "#f5efe8",
          fontFamily: "Hanken",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 760 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Unbounded",
                fontSize: 96,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
              }}
            >
              Alexandre
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Unbounded",
                fontSize: 128,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#ff6a13",
              }}
            >
              Proust
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                alignSelf: "flex-start",
                border: "3px solid #ff6a13",
                borderRadius: 999,
                padding: "8px 22px",
                fontFamily: "Unbounded",
                fontSize: 26,
                color: "#ff6a13",
              }}
            >
              Product builder · Développeur fullstack
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 34, lineHeight: 1.25, maxWidth: 720 }}>{profile.promise}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" }}>
          <img src={`data:image/svg+xml,${encodeURIComponent(spark)}`} width={260} height={260} alt="" />
          <div style={{ display: "flex", fontSize: 26, color: "#a89e94" }}>portfolio.alx-pst.tech</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: display, weight: 800, style: "normal" },
        { name: "Hanken", data: text, weight: 500, style: "normal" },
      ],
    },
  );
}
