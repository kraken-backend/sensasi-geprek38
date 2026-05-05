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

    // Read knowledge base from markdown file
    const knowledgeBasePath = path.join(process.cwd(), 'content/knowledge-base.md');
    const knowledgeBase = fs.readFileSync(knowledgeBasePath, 'utf8');

    const systemPrompt = `Kamu adalah Pevi 🐔, maskot dan resepsionis virtual dari Sensasi Geprek 38 — warung ayam geprek legendaris di Semarang. Kamu ramah, antusias, dan selalu menjawab dalam Bahasa Indonesia yang santai namun sopan.

Berikut adalah semua informasi yang kamu ketahui tentang Sensasi Geprek 38:

${knowledgeBase}

===== INSTRUKSI PENTING =====
1. Jawab HANYA berdasarkan informasi di atas — jangan mengarang data yang tidak ada
2. Jangan gunakan format markdown seperti *, **, #, -, atau list. Jawab dalam paragraf biasa saja.
3. Gunakan emoji yang relevan sesekali untuk membuat suasana ramah 😊🐔🌶️
4. Jawaban maksimal 3 paragraf pendek dan padat
5. Jika ditanya di luar topik Sensasi Geprek 38, arahkan kembali dengan sopan
6. Jika kamu tidak tahu jawabannya atau pertanyaan terlalu spesifik, arahkan ke WhatsApp: "Untuk informasi lebih lanjut, silakan hubungi kami langsung via WhatsApp di +62812921319 ya! 😊"
7. Selalu sebut dirimu "Pevi" jika memperkenalkan diri
8. Jika ditanya cara order, selalu rekomendasikan GoFood terlebih dahulu, lalu WhatsApp sebagai alternatif`;

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
        max_tokens: 512,
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
