import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
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
          content: "👋 Hi! I'm AyushBot — your AI guide to Ayush Patel’s portfolio. Ask me about his projects, skills, or experience!",
        },
      ]);
    }
  }, [isOpen]);

  const slideIn = useSpring({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0%)' },
  });

  const sendMessage = async (promptOverride?: string) => {
    const content = promptOverride || input.trim();
    if (!content) return;

    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/ask', {
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
          { role: 'assistant', content: '❌ Invalid server response. Please try again later.' },
        ]);
      } else {
        setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
      }
    } catch {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: '❌ Something went wrong. Please try again.' },
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

      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2 hover:scale-110 hover:shadow-2xl transition-transform duration-300 group"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-sm font-semibold flex items-center space-x-1">
          🤖
          <span className="group-hover:animate-pulse">Ask AyushBot</span>
        </span>
        <span className="bg-white text-purple-700 text-xs font-bold px-2 py-1 rounded shadow-md">AI</span>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-ping ml-1"></span>
      </button>

      {isOpen && (
        <animated.div
          style={slideIn}
          className="fixed top-0 right-0 w-full max-w-md h-screen bg-gray-900 border-l border-gray-700 shadow-2xl z-50 flex flex-col"
        >
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-indigo-300">👋 I’m AyushBot</h2>
                <p className="text-xs text-gray-300">Ask me anything about Ayush’s projects, skills, or experience – Powered by AI, trained on his real portfolio.</p>
              </div>
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
            <div className="p-4 border-t border-gray-700 bg-gray-900 flex gap-2">
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
        </animated.div>
      )}
    </>
  );
}
