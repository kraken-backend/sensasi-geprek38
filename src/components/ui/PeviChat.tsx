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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo! Saya Pevi 🐔 — AI Resepsionis dari Sensasi Geprek 38, dibuat oleh Kraken menggunakan API AI dari Pevi Generasi 01. Ada yang bisa saya bantu? Tanya aja soal menu, harga, lokasi, atau jam buka kami! 😊',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Auto scroll to bottom when new message arrives.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Sends user message to Groq API and appends response.
   */
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
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
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
        { role: 'assistant', content: 'Maaf, terjadi kesalahan. Silakan coba lagi ya! 🙏' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles Enter key press to send message.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Pevi Mascot Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 z-50 transition-transform hover:scale-110"
        style={{ right: '96px' }}
        aria-label="Chat dengan Pevi"
      >
        <div className="relative">
          {/* Pulse ring */}
          <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-30"></span>
          <Image
            src="/pevi.gif"
            alt="Pevi - Maskot Sensasi Geprek 38"
            width={64}
            height={64}
            className="relative z-10 drop-shadow-lg"
            unoptimized
          />
          {/* Tooltip */}
          <span
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 px-3 py-1 text-xs text-white opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
          >
            Tanya Pevi!
          </span>
        </div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end pb-24 pr-6"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Window */}
          <div
            className="relative flex flex-col rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: '360px',
              height: '520px',
              background: 'white',
              zIndex: 60,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ background: 'rgba(180,0,0,0.9)' }}
            >
              <Image
                src="/pevi.gif"
                alt="Pevi"
                width={40}
                height={40}
                className="rounded-full bg-white p-1"
                unoptimized
              />
              <div>
                <p className="text-white font-semibold text-sm">Pevi 🐔</p>
                <p className="text-red-200 text-xs">Resepsionis Sensasi Geprek 38</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-white hover:text-red-200 transition-colors text-xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
              style={{ background: '#FFF8F8' }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <Image
                      src="/pevi.gif"
                      alt="Pevi"
                      width={28}
                      height={28}
                      className="mr-2 self-end rounded-full bg-white p-0.5 shadow-sm flex-shrink-0"
                      unoptimized
                    />
                  )}
                  <div
                    className="max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
                    style={{
                      background: msg.role === 'user' ? 'rgba(180,0,0,0.85)' : 'white',
                      color: msg.role === 'user' ? 'white' : '#1a1a1a',
                      borderRadius: msg.role === 'user'
                        ? '18px 18px 4px 18px'
                        : '18px 18px 18px 4px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="flex gap-1 px-4 py-3 rounded-2xl bg-white shadow-sm"
                    style={{ borderRadius: '18px 18px 18px 4px' }}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-3 py-3 border-t"
              style={{ borderColor: '#FFE0E0' }}
            >
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
