import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export async function GET() {
  try {
    const content = getContent();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal membaca konten" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Data tidak valid" },
        { status: 400 }
      );
    }
    const current = getContent();
    const next = { ...current, ...body };
    saveContent(next);
    return NextResponse.json({ ok: true, content: next });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menyimpan konten" },
      { status: 500 }
    );
  }
}