// Path: src/components/ui/PeviChat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Pevi AI Chat component.
 * Shows animated mascot that opens a chat modal when clicked.
 * Uses Groq API via /api/chat endpoint.
 * @returns JSX.Element
 */
export default function PeviChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo! Saya Pevi 🐔 — AI Resepsionis dari Sensasi Geprek 38, dibuat oleh Kraken menggunakan API AI dari Pevi Generasi 01. Ada yang bisa saya bantu? Tanya aja soal menu, harga, lokasi, atau jam buka kami! 😊',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /** Auto scroll to bottom when new message arrives. */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /** Looping tooltip visibility every 2 seconds. */
  useEffect(() => {
    if (!showTooltip) return;
    const interval = setInterval(() => {
      setTooltipVisible((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, [showTooltip]);

  /** Sends user message to Groq API and appends response. */
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message || 'Maaf, saya tidak bisa menjawab saat ini.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Maaf, terjadi kesalahan. Silakan hubungi kami via WhatsApp ya! 🙏' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /** Handles Enter key press to send message. */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/*
        Pevi: fixed bottom-right, positioned LEFT of WA bubble.
        WA bubble is at right-6 (24px), width 64px → WA left edge = 88px from right.
        Pevi width = 224px + 16px gap = right: 104px from right edge.
      */}
      <div
        className="fixed z-50"
        style={{
          bottom: '1px',
          right: '104px',
          width: '224px',
          height: '224px',
        }}
      >
        {/* Tooltip — positioned above Pevi, centered */}
        {showTooltip && !isOpen && (
          <div
            className="absolute transition-opacity duration-500"
            style={{
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: tooltipVisible ? 1 : 0,
              background: '#FFF3CD',
              border: '1px solid #FFD700',
              borderRadius: '12px',
              padding: '8px 14px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              zIndex: 10,
            }}
          >
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
              Halo.. Saya Pevi 🐔
            </p>
            <p style={{ fontSize: '11px', color: '#666', margin: 0 }}>
              Klik saya untuk chat!
            </p>
            {/* Arrow pointing down to Pevi */}
            <span
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #FFF3CD',
              }}
            />
          </div>
        )}

        {/* Pevi button */}
        <button
          onClick={() => { setIsOpen(true); setShowTooltip(false); }}
          className="relative w-full h-full transition-transform hover:scale-105"
          aria-label="Chat dengan Pevi"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <span
            className="absolute inset-0 animate-ping rounded-full opacity-20"
            style={{ background: 'rgba(180,0,0,0.5)' }}
          />
          <Image
            src="/pevi.gif"
            alt="Pevi - Maskot Sensasi Geprek 38"
            width={224}
            height={224}
            className="relative z-10 drop-shadow-lg"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            unoptimized
          />
        </button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end pb-24 pr-6">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="relative flex flex-col rounded-2xl shadow-2xl overflow-hidden"
            style={{ width: '360px', height: '520px', background: 'white', zIndex: 60 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(180,0,0,0.9)' }}>
              <Image src="/pevi.gif" alt="Pevi" width={40} height={40} className="rounded-full bg-white p-1" unoptimized />
              <div>
                <p className="text-white font-semibold text-sm">Pevi 🐔</p>
                <p className="text-red-200 text-xs">Resepsionis Sensasi Geprek 38</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="ml-auto text-white hover:text-red-200 transition-colors text-xl font-bold">×</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ background: '#FFF8F8' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <Image src="/pevi.gif" alt="Pevi" width={28} height={28} className="mr-2 self-end rounded-full bg-white p-0.5 shadow-sm flex-shrink-0" unoptimized />
                  )}
                  <div
                    className="max-w-[75%] px-3 py-2 text-sm leading-relaxed"
                    style={{
                      background: msg.role === 'user' ? 'rgba(180,0,0,0.85)' : 'white',
                      color: msg.role === 'user' ? 'white' : '#1a1a1a',
                      borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 px-4 py-3 bg-white shadow-sm" style={{ borderRadius: '18px 18px 18px 4px' }}>
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 border-t" style={{ borderColor: '#FFE0E0' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanya tentang menu, harga..."
                className="flex-1 rounded-full px-4 py-2 text-sm outline-none border focus:border-red-400 transition-colors"
                style={{ borderColor: '#FFD0D0', background: '#FFF8F8' }}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0"
                style={{
                  background: input.trim() && !isLoading ? 'rgba(180,0,0,0.85)' : '#ccc',
                  cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
