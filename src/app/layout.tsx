import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://igrejanovaterra.org.br"),
  title: {
    default: "Igreja Nova Terra | Icoaraci, Belém-PA",
    template: "%s | Igreja Nova Terra",
  },
  description:
    "A Igreja Nova Terra existe para ganhar, cuidar e capacitar vidas para o Reino de Deus, em Icoaraci, Belém-PA. Conheça as Redes, o projeto Casa Amarela e venha nos visitar.",
  openGraph: {
    title: "Igreja Nova Terra",
    description:
      "Uma igreja em avivamento em Icoaraci, Belém-PA. Venha conhecer.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col bg-white font-sans text-night-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
