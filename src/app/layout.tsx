import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banquet - Private communities and events",
  description:
    "Step into a world of elegance and exclusive connections with our Banquet app. Elevate your social experiences by joining a refined community that celebrates life's finer moments. Engage in sophisticated conversations, curated events, and exquisite connections. Unveil a realm where ordinary interactions are transformed into extraordinary memories. Embrace the art of curating experiences with Banquet – where every connection is an invitation to a refined gathering.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
