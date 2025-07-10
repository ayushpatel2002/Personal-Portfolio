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
          content: "👋 Hi! I'm Bimb — your AI guide to Ayush Patel’s portfolio. Ask me about his projects, skills, or experience!",
        },
      ]);
    }
  }, [isOpen]);


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
        `}
      </style>

      {!isOpen && (
        <button
          className="fixed bottom-6 right-6 z-50 rounded-full p-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 shadow-xl ring-2 ring-purple-400 hover:scale-110 transition-transform duration-300 ease-in-out animate-pulse"
          onClick={() => setIsOpen(true)}
        >
          <img src="/AR Logo.png" alt="Open chat" className="w-6 h-6" />
        </button>
      )}

      <div
        className={`fixed right-0 sm:top-0 bottom-0 w-full sm:max-w-md h-[50vh] sm:h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-l border-gray-700 drop-shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out rounded-l-3xl sm:rounded-none ${isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
      >
            <div className="p-4 border-b border-gray-700 flex justify-between items-center rounded-t-3xl sm:rounded-none">
              <div className="flex items-center gap-2">
                <img src="/AR Logo.png" alt="Bimb Logo" className="w-6 h-6" />
                <h2 className="text-lg font-semibold text-indigo-300">I’m Bimb</h2>
              </div>
              <p className="text-xs text-gray-300 flex-1 ml-2">Ask me anything about Ayush’s projects, skills, or experience – Powered by AI, trained on his real portfolio.</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-gray-100 text-xl"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.slice(1).map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-md shadow text-sm whitespace-pre-wrap ${
                    msg.role === 'user' ? 'bg-blue-600/80 text-right text-white' : 'bg-gray-800/80 text-left text-gray-300'
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ))}

              {isLoading && (
                <div className="p-3 rounded-md bg-gray-800/80 shadow text-left text-sm text-gray-300 flex items-center">
                  <span className="dot-flash" />
                  <span className="dot-flash" />
                  <span className="dot-flash" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            <div className="px-4 py-2 border-t border-gray-700 bg-gray-700">
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
            <div className="sticky bottom-0 p-4 border-t border-gray-700 bg-gray-900 flex gap-2">
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
