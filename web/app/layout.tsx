import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://onurbsofa.github.io"),
  title: "Bruno Fazio — Percepción",
  description:
    "Portfolio de Bruno Fazio: desarrollo full stack, ciberseguridad y videojuegos. Una experiencia interactiva en 3D/4D.",
  openGraph: {
    title: "Bruno Fazio — Percepción",
    description: "Desarrollo full stack, ciberseguridad y videojuegos.",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/Portfolio/img/linkedin_banner_teseracto.png", width: 1584, height: 396 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${grotesk.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
