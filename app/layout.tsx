import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Providers from "./providers";
import "@/index.css";

export const metadata: Metadata = {
  title: "garvit.web",
  description: "Garvit Chawla's portfolio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-background">
            <Navigation />
            <div className="pt-8">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}