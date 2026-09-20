import { getContent } from "@/lib/content";
import "./page.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kontak Kami - Lelang Ikan",
};

export default function ContactPage() {
  const content = getContent();
  const contactPage = content.contactPage || {};
  const cards = content.contactSection?.cards || [];

  return (
    <main>
      <section className="page-title">
        <div className="container">
          <h1>{contactPage.title}</h1>
          <p>{contactPage.intro}</p>
        </div>
      </section>

      <section className="container">
        <div className="contact-grid">
          {cards.map((card) => (
            <div className="contact-card" key={card.id}>
              <div className="icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.line1}</p>
              <p>{card.line2}</p>
            </div>
          ))}
        </div>

        <div className="contact-form-wrap">
          <h2>{contactPage.formTitle}</h2>
          <form action="#" method="post">
            <div className="form-group">
              <label htmlFor="nama">Nama Lengkap</label>
              <input type="text" id="nama" name="nama" placeholder="Nama Anda" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="email@contoh.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="subjek">Subjek</label>
              <input type="text" id="subjek" name="subjek" placeholder="Topik pesan Anda" />
            </div>
            <div className="form-group">
              <label htmlFor="pesan">Pesan</label>
              <textarea id="pesan" name="pesan" placeholder="Tuliskan pesan Anda..." required></textarea>
            </div>
            <button type="submit" className="btn">Kirim Pesan</button>
          </form>
        </div>
      </section>
    </main>
  );
}