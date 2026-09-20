import "./globals.css";
import { getContent } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Lelang Ikan - Pasar Ikan Segar",
  description: "Lelang ikan segar dari nelayan lokal. Transparan, kompetitif, dan harga terbaik.",
};

export default function RootLayout({ children }) {
  const content = getContent();

  return (
    <html lang="id">
      <body>
        <Header content={content} />
        {children}
        <Footer content={content} />
      </body>
    </html>
  );
}