import { getContent } from "@/lib/content";
import "./page.css";

export const dynamic = "force-dynamic";

export default function Home() {
  const content = getContent();
  const hero = content.hero || {};
  const auctions = content.auctions || [];
  const stats = content.stats || [];
  const about = content.about || {};
  const contactSection = content.contactSection || {};
  const site = content.site || {};

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
          <a className="btn" href={hero.ctaAnchor || "#lelang"}>{hero.ctaText}</a>
        </div>
      </section>

      <section className="container">
        <div className="featured" id="lelang">
          <h2>{content.auctionSection?.title}</h2>
          <div className="fish-grid">
            {auctions.map((item) => (
              <div className="fish-card" key={item.id}>
                <div className="fish-icon">{item.icon}</div>
                <h3>{item.name}</h3>
                <p className="origin">{item.origin}</p>
                <p className="price">{item.price}</p>
                <p className="bid">
                  Penawaran: <strong>{item.bids}</strong> · {item.timeLeft}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="info">
          {stats.map((item) => (
            <div className="info-item" key={item.id}>
              <div className="icon">{item.icon}</div>
              <div className="num">{item.number}</div>
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        <div id="tentang" className="featured">
          <h2>{about.title}</h2>
          {(about.paragraphs || []).map((paragraph, index) => (
            <p key={index} style={{ marginBottom: "12px" }}>{paragraph}</p>
          ))}
        </div>

        <div id="kontak" className="featured">
          <h2>{contactSection.title}</h2>
          <p style={{ marginBottom: "8px" }}>📞 {site.phone}</p>
          <p style={{ marginBottom: "8px" }}>✉️ {site.email}</p>
          <p>Alamat: {site.address}</p>
        </div>
      </section>
    </main>
  );
}