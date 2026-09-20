import Link from "next/link";

export default function Header({ content }) {
  const site = content.site || {};

  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <Link href="/">
            {site.heroName || "Lelang"}
            <span>{site.heroHighlight || "Ikan"}</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link href="/#lelang">Daftar Lelang</Link></li>
            <li><Link href="/#tentang">Tentang</Link></li>
            <li><Link href="/kontak">Kontak</Link></li>
            <li><Link href="/admin">Admin</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}