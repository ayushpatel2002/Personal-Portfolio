import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const suggestedPrompts = [
  'Tell me about your NLP project',
  'What did you do at Digicor?',
  'Which tools do you use for forecasting?',
  'List your top 3 data projects',
  'Show me your Power BI dashboard work',
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
    if (isOpen && messages.length === 1) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "⚡ Your AI-powered assistant — trained on Ayush’s real work to give sharp, instant insights.",
        },
      ]);
    }
  }, [isOpen]);

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
        `}
      </style>

      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white px-4 py-2 rounded-full shadow-xl flex items-center space-x-2 hover:scale-110 transition-transform duration-300 ring-2 ring-purple-400 animate-pulse"
        onClick={() => setIsOpen(true)}
      >
        <img
          src="/Public/Animated Logo DB.svg"
          alt="Logo"
          className="w-7 h-7 rounded-full animate-spin-slow ring-2 ring-indigo-300 shadow-[inset_0_0_10px_rgba(255,255,255,0.3),0_0_12px_rgba(139,92,246,0.7)]"
        />
        <span className="text-sm font-semibold flex items-center gap-1">
          Ask Bimb
          <span className="text-[10px] w-4 h-4 flex items-center justify-center bg-indigo-200 text-indigo-800 rounded font-bold">AI</span>
        </span>
      </button>

      <div
        className={`fixed top-0 right-0 w-full sm:max-w-md h-screen bg-gradient-to-b from-[#141E30] to-[#243B55] border-l border-[#475569] shadow-2xl rounded-l-3xl backdrop-blur-lg overflow-hidden z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}
      >
            <div className="p-4 border-b border-[#475569] bg-[#1e293b]/90 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
                  👋 I’m Bimb
                </h2>
                <p className="text-xs text-gray-300">🤖 Ask me anything about Ayush’s projects, skills, or experience — Powered by AI, trained on his real portfolio.</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-gray-100 text-xl"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
              {messages.slice(1).map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-md shadow text-sm whitespace-pre-wrap ${
                    msg.role === 'user' ? 'bg-blue-600/80 text-right text-white' : 'bg-[#1e293b]/80 text-left text-gray-300'
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ))}

              {isLoading && (
                <div className="p-3 rounded-md bg-[#1e293b]/80 shadow text-left text-sm text-gray-300 flex items-center">
                  <img
                    src="/Public/Animated Logo DB.svg"
                    alt="Loading"
                    className="w-5 h-5 animate-spin-slow"
                  />
                  <span className="ml-2">Thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            <div className="px-4 py-2 border-t border-[#475569] bg-[#334155]">
              <p className="text-xs text-gray-300 mb-1">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs bg-indigo-300 text-indigo-900 px-3 py-1 rounded-full hover:bg-indigo-400 transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="sticky bottom-0 p-4 border-t border-[#475569] bg-[#0f172a]/80 backdrop-blur flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask a question..."
                className="flex-1 border border-gray-600 bg-gray-800 text-gray-200 px-3 py-2 rounded text-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 text-sm"
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
      </div>
    </>
  );
}
