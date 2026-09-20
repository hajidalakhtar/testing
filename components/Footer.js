import Link from "next/link";

export default function Footer({ content }) {
  const site = content.site || {};

  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          &copy; {site.copyright || "2026"} <Link href="/">{site.name || "LelangIkan"}</Link>.
          Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}