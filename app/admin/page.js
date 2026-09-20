"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import "./admin.css";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function AdminPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      setContent(data);
    } catch {
      setMessage({ type: "error", text: "Gagal memuat konten." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const update = (section, value) => {
    setContent((prev) => ({ ...prev, [section]: value }));
  };

  const updateNested = (path, value) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let target = next;
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateList = (section, id, key, value) => {
    update(
      section,
      (content[section] || []).map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const addItem = (section, defaults = {}) => {
    update(section, [...(content[section] || []), { id: uid(), ...defaults }]);
  };

  const removeItem = (section, id) => {
    update(
      section,
      (content[section] || []).filter((item) => item.id !== id)
    );
  };

  const updateAbout = (index, value) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      next.about.paragraphs[index] = value;
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (res.ok) {
        setContent(data.content);
        setMessage({ type: "success", text: "Konten berhasil disimpan." });
      } else {
        setMessage({ type: "error", text: data.error || "Gagal menyimpan." });
      }
    } catch {
      setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="container">Memuat konten...</div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <main className="admin">
      <div className="container">
        <div className="admin-head">
          <div>
            <h1>Panel Admin</h1>
            <p>Kelola konten situs LelangIkan.</p>
          </div>
          <Link href="/" className="btn btn-secondary">Lihat Situs</Link>
        </div>

        {message && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <Section title="Pengaturan Situs">
          <Field label="Nama Situs" value={content.site.name} path="site.name" set={updateNested} />
          <Field label="Nama (Bagian 1 Logo)" value={content.site.heroName} path="site.heroName" set={updateNested} />
          <Field label="Nama (Bagian 2 Logo)" value={content.site.heroHighlight} path="site.heroHighlight" set={updateNested} />
          <Field label="Telepon" value={content.site.phone} path="site.phone" set={updateNested} />
          <Field label="Jam Telepon" value={content.site.phoneHours} path="site.phoneHours" set={updateNested} />
          <Field label="Email" value={content.site.email} path="site.email" set={updateNested} />
          <Field label="Keterangan Email" value={content.site.emailReply} path="site.emailReply" set={updateNested} />
          <Field label="Alamat" value={content.site.address} path="site.address" set={updateNested} />
          <Field label="Tahun Copyright" value={content.site.copyright} path="site.copyright" set={updateNested} />
        </Section>

        <Section title="Hero (Halaman Utama)">
          <Field label="Judul" value={content.hero.title} path="hero.title" set={updateNested} />
          <Field label="Subjudul" value={content.hero.subtitle} path="hero.subtitle" set={updateNested} textarea />
          <Field label="Teks Tombol" value={content.hero.ctaText} path="hero.ctaText" set={updateNested} />
          <Field label="Anchor Tombol" value={content.hero.ctaAnchor} path="hero.ctaAnchor" set={updateNested} />
        </Section>

        <Section title="Judul Section Lelang">
          <Field label="Judul" value={content.auctionSection.title} path="auctionSection.title" set={updateNested} />
        </Section>

        <Section
          title="Daftar Lelang"
          subtitle={`${content.auctions.length} lelang`}
          onAdd={() => addItem("auctions", { icon: "🐟", name: "Ikan Baru", origin: "Pelabuhan", price: "Mulai Rp 0 / kg", bids: 0, timeLeft: "Sisa 2 jam" })}
        >
          {content.auctions.map((item) => (
            <ListItem
              key={item.id}
              title={item.name}
              onRemove={() => removeItem("auctions", item.id)}
            >
              <Field values={item} id={item.id} set={(k, v) => updateList("auctions", item.id, k, v)} label="Ikon" field="icon" />
              <Field values={item} id={item.id} set={(k, v) => updateList("auctions", item.id, k, v)} label="Nama" field="name" />
              <Field values={item} id={item.id} set={(k, v) => updateList("auctions", item.id, k, v)} label="Asal" field="origin" />
              <Field values={item} id={item.id} set={(k, v) => updateList("auctions", item.id, k, v)} label="Harga" field="price" />
              <Field values={item} id={item.id} set={(k, v) => updateList("auctions", item.id, k, v)} label="Jumlah Penawaran" field="bids" type="number" />
              <Field values={item} id={item.id} set={(k, v) => updateList("auctions", item.id, k, v)} label="Sisa Waktu" field="timeLeft" />
            </ListItem>
          ))}
        </Section>

        <Section
          title="Statistik"
          subtitle={`${content.stats.length} item`}
          onAdd={() => addItem("stats", { icon: "⚓", number: "0", label: "Statistik baru" })}
        >
          {content.stats.map((item) => (
            <ListItem
              key={item.id}
              title={item.label}
              onRemove={() => removeItem("stats", item.id)}
            >
              <Field values={item} id={item.id} set={(k, v) => updateList("stats", item.id, k, v)} label="Ikon" field="icon" />
              <Field values={item} id={item.id} set={(k, v) => updateList("stats", item.id, k, v)} label="Angka" field="number" />
              <Field values={item} id={item.id} set={(k, v) => updateList("stats", item.id, k, v)} label="Label" field="label" />
            </ListItem>
          ))}
        </Section>

        <Section title="Tentang">
          <Field label="Judul" value={content.about.title} path="about.title" set={updateNested} />
          <div className="field">
            <label>Paragraf</label>
            {content.about.paragraphs.map((paragraph, index) => (
              <div className="paragraph-row" key={index}>
                <textarea
                  value={paragraph}
                  onChange={(e) => updateAbout(index, e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-small"
                  onClick={() => {
                    const next = structuredClone(content);
                    next.about.paragraphs.splice(index, 1);
                    setContent(next);
                  }}
                >
                  Hapus
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary btn-small"
              onClick={() => {
                const next = structuredClone(content);
                next.about.paragraphs.push("");
                setContent(next);
              }}
            >
              + Tambah Paragraf
            </button>
          </div>
        </Section>

        <Section title="Kartu Kontak (Halaman Utama)">
          <Field label="Judul Section" value={content.contactSection.title} path="contactSection.title" set={updateNested} />
          <div className="list">
            {content.contactSection.cards.map((card) => (
              <ListItem
                key={card.id}
                title={card.title}
                onRemove={() => update("contactSection", { ...content.contactSection, cards: content.contactSection.cards.filter((c) => c.id !== card.id) })}
              >
                <Field values={card} id={card.id} set={(k, v) => update("contactSection", { ...content.contactSection, cards: content.contactSection.cards.map((c) => (c.id === card.id ? { ...c, [k]: v } : c)) })} label="Ikon" field="icon" />
                <Field values={card} id={card.id} set={(k, v) => update("contactSection", { ...content.contactSection, cards: content.contactSection.cards.map((c) => (c.id === card.id ? { ...c, [k]: v } : c)) })} label="Judul" field="title" />
                <Field values={card} id={card.id} set={(k, v) => update("contactSection", { ...content.contactSection, cards: content.contactSection.cards.map((c) => (c.id === card.id ? { ...c, [k]: v } : c)) })} label="Baris 1" field="line1" />
                <Field values={card} id={card.id} set={(k, v) => update("contactSection", { ...content.contactSection, cards: content.contactSection.cards.map((c) => (c.id === card.id ? { ...c, [k]: v } : c)) })} label="Baris 2" field="line2" />
              </ListItem>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              update("contactSection", {
                ...content.contactSection,
                cards: [...content.contactSection.cards, { id: uid(), icon: "📞", title: "Kartu Baru", line1: "", line2: "" }],
              })
            }
          >
            + Tambah Kartu
          </button>
        </Section>

        <Section title="Halaman Kontak">
          <Field label="Judul" value={content.contactPage.title} path="contactPage.title" set={updateNested} />
          <Field label="Pengantar" value={content.contactPage.intro} path="contactPage.intro" set={updateNested} textarea />
          <Field label="Judul Form" value={content.contactPage.formTitle} path="contactPage.formTitle" set={updateNested} />
        </Section>

        <div className="save-bar">
          <button className="btn" onClick={save} disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </main>
  );
}

function Section({ title, subtitle, onAdd, children }) {
  return (
    <section className="admin-section">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <span>{subtitle}</span>}
        </div>
        {onAdd && (
          <button type="button" className="btn btn-secondary btn-small" onClick={onAdd}>
            + Tambah
          </button>
        )}
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}

function Field({ label, field, path, set, values, value, textarea, type }) {
  const currentValue =
    value !== undefined
      ? value
      : values
        ? values[field] ?? ""
        : "";

  const handleChange = (e) => {
    const val = type === "number" ? Number(e.target.value) : e.target.value;
    if (path) set(path, val);
    if (set && field) set(field, val);
  };

  const inputProps = {
    className: "admin-input",
    value: currentValue,
    onChange: handleChange,
    type: type === "number" ? "number" : undefined,
  };

  return (
    <div className="field">
      <label>{label}</label>
      {textarea ? (
        <textarea {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}
    </div>
  );
}

function ListItem({ title, onRemove, children }) {
  return (
    <div className="list-item">
      <div className="list-item-head">
        <strong>{title}</strong>
        <button type="button" className="btn btn-danger btn-small" onClick={onRemove}>
          Hapus
        </button>
      </div>
      <div className="list-item-fields">{children}</div>
    </div>
  );
}