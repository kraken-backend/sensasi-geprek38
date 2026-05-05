// Path: src/app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * POST /api/chat
 * Handles chat messages from Pevi AI receptionist.
 * Reads knowledge base from content/knowledge-base.md.
 * Sends message to Groq API and returns AI response.
 * Body: { messages: { role: string, content: string }[] }
 * Returns: { message: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_API_GROQ;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const knowledgeBasePath = path.join(process.cwd(), 'content/knowledge-base.md');
    const knowledgeBase = fs.readFileSync(knowledgeBasePath, 'utf8');

    const systemPrompt = `Kamu adalah Pevi 🐔, maskot dan resepsionis virtual dari Sensasi Geprek 38 — warung ayam geprek legendaris di Semarang. Kamu ramah, antusias, dan selalu menjawab dalam Bahasa Indonesia yang santai namun sopan.

Berikut adalah semua informasi yang kamu ketahui tentang Sensasi Geprek 38:

${knowledgeBase}

===== INSTRUKSI FORMAT JAWABAN =====
1. Jawab HANYA berdasarkan informasi di atas — jangan mengarang data
2. DILARANG menggunakan simbol markdown: *, **, #, -, •, atau numbering 1. 2. 3.
3. Tulis dalam paragraf biasa yang mengalir natural
4. Jika perlu menyebut beberapa item menu, tulis dalam satu kalimat seperti: "Ada Geprek Original (Rp 15.600), Geprek Keju (Rp 16.800), dan lainnya."
5. Pisahkan paragraf dengan baris kosong (enter 2x)
6. Maksimal 3 paragraf pendek — padat dan jelas
7. Jika ada link, JANGAN tulis URL panjang. Cukup tulis nama seperti "GoFood" atau "WhatsApp" saja — sistem akan otomatis membuat link-nya
8. Gunakan emoji sesekali tapi jangan berlebihan 😊
9. Jika tidak tahu atau di luar topik, arahkan ke WhatsApp +62812921319
10. Selalu sebut dirimu "Pevi" jika memperkenalkan diri

Contoh jawaban yang BENAR:
"Halo! Di Sensasi Geprek 38, kami punya menu ayam geprek dengan berbagai pilihan seperti Geprek Original (Rp 15.600), Geprek Keju (Rp 16.800), dan Geprek Mozarella (Rp 21.600). 😊

Untuk mie geprek, ada Mie Goreng Geprek (Rp 18.000) dan Mie Geprek Mozarella (Rp 22.800). Semua menu dibuat dengan bumbu rempah warisan keluarga yang bikin rasanya nendang dari dalam! 🌶️

Mau pesan? Bisa langsung via GoFood atau datang ke Jl. Gemah Tengah No.38, Semarang."`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[PeviChat] Groq API error:', error);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content ||
      'Maaf, saya tidak bisa menjawab saat ini. Silakan hubungi kami via WhatsApp di +62812921319 ya! 😊';

    return NextResponse.json({ message });

  } catch (error) {
    console.error('[PeviChat] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
