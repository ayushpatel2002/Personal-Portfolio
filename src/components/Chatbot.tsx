import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const suggestedPrompts = [
  'What tools do you use for forecasting?',
  'Tell me about your NLP project',
  'Which SQL queries did you use for fraud detection?',
  'What methods did you apply for time series prediction?',
  'Explain your image classification CNN project',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'You are a helpful assistant that only answers based on Ayush Patel’s portfolio. Respond with relevant information only.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      if (window.innerWidth < 768) {
        // Only disable scroll on small screens
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    } else {
      body.style.overflow = '';
    }

    return () => {
      body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenChatbot);
    return () => {
      window.removeEventListener('open-chatbot', handleOpenChatbot);
    };
  }, []);

  const sendMessage = async (promptOverride?: string) => {
    const content = promptOverride || input.trim();
    if (!content) return;

    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const backendUrl = '/api';

    try {
      console.log("📡 Sending to:", `${backendUrl}/ask`);
      const response = await fetch(`${backendUrl}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: content }),
      });

      const data = await response.json();
      const reply = data?.answer?.trim();

      if (!response.ok || !reply) {
        setMessages([
          ...updatedMessages,
          {
            role: 'assistant',
            content: `❌ Server error (${response.status}). Please try again later.`,
          },
        ]);
      } else {
        setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
      }
    } catch (error: any) {
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: `❌ Failed to connect to server. ${error?.message || 'Please try again.'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes flash {
            0% { opacity: 0.2; }
            20% { opacity: 1; }
            100% { opacity: 0.2; }
          }
          .dot-flash {
            width: 8px;
            height: 8px;
            background-color: #d1d5db;
            border-radius: 9999px;
            animation: flash 1s infinite;
            margin-right: 4px;
          }
          .dot-flash:nth-child(2) {
            animation-delay: 0.2s;
          }
          .dot-flash:nth-child(3) {
            animation-delay: 0.4s;
          }
          .animate-spin-slow {
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          :root {
            --panelBg: rgba(20, 24, 31, 0.55);
            --panelBorder: rgba(255, 255, 255, 0.12);
            --panelGlow: 0 8px 30px rgba(0,0,0,0.35);
            --textPrimary: #E5E7EB;
            --textSecondary: #CBD5E1;
            --accentStart: #6EA8FF; /* soft iOS-like blue */
            --accentEnd: #6B8BFF;
            --blue: #0A84FF; /* iOS blue */
            --bubbleBlueFrom: #1B6CFF;
            --bubbleBlueTo: #4696FF;
          }

          .glass {
            background: var(--panelBg);
            backdrop-filter: blur(18px) saturate(120%);
            -webkit-backdrop-filter: blur(18px) saturate(120%);
            border: 1px solid var(--panelBorder);
            box-shadow: var(--panelGlow);
          }

          .soft-shadow { box-shadow: 0 10px 30px rgba(0,0,0,0.25); }

          .btn-chip {
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.2);
            color: var(--textPrimary);
            border-radius: 9999px;
            padding: 6px 10px;
            transition: transform .15s ease, background-color .2s ease, border-color .2s ease;
          }
          .btn-chip:hover { transform: translateY(-1px); background: rgba(255,255,255,0.18); }

          .btn-primary {
            background: linear-gradient(180deg, var(--accentStart), var(--accentEnd));
            color: white; border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.22);
            box-shadow: 0 6px 18px rgba(110,168,255,0.35);
            transition: transform .15s ease, box-shadow .2s ease, filter .2s ease;
          }
          .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(110,168,255,0.45); filter: brightness(1.04); }
          .btn-primary:active { transform: translateY(0); }

          .bubble-user {
            background: linear-gradient(180deg, var(--bubbleBlueFrom), var(--bubbleBlueTo));
            color: white; border-radius: 16px; box-shadow: 0 4px 14px rgba(38,132,255,0.35);
          }
          .bubble-assistant {
            background: rgba(255,255,255,0.06);
            color: var(--textSecondary);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
          }

          .markdown-body h1, .markdown-body h2, .markdown-body h3 { color: var(--textPrimary); }
          .markdown-body a { color: var(--blue); }
          .markdown-body code { background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 6px; }

          /* Slim, elegant scrollbar for the chat area */
          .chat-scroll-area::-webkit-scrollbar { width: 10px; }
          .chat-scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }
          .chat-scroll-area::-webkit-scrollbar-track { background: transparent; }
        `}
      </style>

      <button
        className="fixed bottom-6 right-6 z-50 group rounded-full glass soft-shadow transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <span className="relative flex items-center px-4 py-2 rounded-full btn-primary gap-2">
          <svg
            className="w-7 h-7 rounded-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" stroke="url(#grad)" strokeWidth="6" fill="none"/>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="100" y2="0">
                <stop offset="0%" stopColor="#6EA8FF"/>
                <stop offset="100%" stopColor="#6B8BFF"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="text-sm font-semibold flex items-center gap-1">
            Ask Bimb
            <span className="text-[10px] w-4 h-4 flex items-center justify-center bg-white/30 text-white rounded font-bold">AI</span>
          </span>
        </span>
      </button>

      <div
        className={`fixed top-0 right-0 w-full sm:max-w-md h-screen glass border-l border-[#475569]/0 overflow-hidden z-50 flex flex-col transform transition-transform duration-300 ease-in-out will-change-transform ${isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}
      >
            <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-[var(--textPrimary)] flex items-center gap-2">
                  👋 I’m Bimb
                </h2>
                <p className="text-xs text-[var(--textSecondary)]">🤖 Ask me anything about Ayush’s projects, skills, or experience — Powered by AI, trained on his real portfolio.</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-gray-100 text-xl"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <style>
              {`
                .chat-scroll-area {
                  will-change: scroll-position;
                  contain: layout style;
                }
              `}
            </style>
            <div className="chat-scroll-area flex-1 overflow-y-auto p-4 space-y-2 pb-24">
              {messages.slice(1).map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 text-sm whitespace-pre-wrap markdown-body ${
                    msg.role === 'user' ? 'bubble-user text-right' : 'bubble-assistant text-left'
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ))}

              {isLoading && (
                <div className="p-3 bubble-assistant text-left text-sm flex items-center gap-2">
                  <svg
                    className="w-5 h-5 animate-spin-slow"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="50" cy="50" r="40" stroke="url(#grad)" strokeWidth="6" fill="none" />
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="100" y2="0">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="ml-2">Thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* UI Modes/Options */}
            <div className="px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm space-y-4">
              <div className="text-xs text-gray-300">🧠 <strong>Bimb</strong> is your AI assistant, trained on Ayush Patel’s real-world portfolio. Ask anything about:</div>
              
              {/* Option 1: Smart Suggestions */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Option 1: Smart Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => sendMessage('Which forecasting methods do you use?')} className="text-xs btn-chip">🔍 Forecasting methods</button>
                  <button onClick={() => sendMessage('How did you detect fraud using SQL?')} className="text-xs btn-chip">🧾 SQL-based fraud detection</button>
                  <button onClick={() => sendMessage('Tell me about your NLP job ad classification project.')} className="text-xs btn-chip">🧠 NLP job ad classifier</button>
                  <button onClick={() => sendMessage('Explain your image classification CNN project.')} className="text-xs btn-chip">🖼️ CNN image classification</button>
                </div>
              </div>

              {/* Option 2: Explore Data Stories */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Option 2: Explore Data Stories</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => sendMessage('How did you forecast energy usage in R?')} className="text-xs btn-chip">📊 R Forecasting</button>
                  <button onClick={() => sendMessage('What SQL logic did you use to detect fraud?')} className="text-xs btn-chip">💡 SQL Logic</button>
                  <button onClick={() => sendMessage('Explain the business impact of your NLP project.')} className="text-xs btn-chip">📈 NLP Impact</button>
                </div>
              </div>

              {/* Option 3: Mini Portfolio Navigator */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Option 3: Mini Portfolio Navigator</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => sendMessage('What business impact did your data projects have?')} className="text-xs btn-chip">🎯 Project impact</button>
                  <button onClick={() => sendMessage('What tools and libraries did you use in each project?')} className="text-xs btn-chip">🧰 Tools & Libraries</button>
                  <button onClick={() => sendMessage('Can you explain the key skills you used across projects?')} className="text-xs btn-chip">💼 Core skills</button>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="sticky bottom-0 p-4 border-t border-white/10 bg-black/30 backdrop-blur flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask a question..."
                className="flex-1 glass text-[var(--textPrimary)] px-3 py-2 rounded-full text-sm border-0"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 btn-primary disabled:opacity-50 text-sm"
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
      </div>
    </>
  );
}
