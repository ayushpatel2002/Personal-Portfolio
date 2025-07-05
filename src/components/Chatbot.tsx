import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      content:
        'You are a helpful assistant that only answers based on Ayush Patel’s portfolio. Respond with relevant information only.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (promptOverride?: string) => {
    const content = promptOverride || input.trim();
    if (!content) return;

    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: '❌ API key missing. Please try again later.' },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: updatedMessages,
          temperature: 0.7,
        }),
      });

      const raw = await response.text();
      const data = JSON.parse(raw);
      const reply = data?.choices?.[0]?.message?.content?.trim();

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
            background-color: #4b5563;
            border-radius: 9999px;
            animation: flash 1s infinite;
            margin-right: 4px;
          }
          .dot-flash:nth-child(2) { animation-delay: 0.2s; }
          .dot-flash:nth-child(3) { animation-delay: 0.4s; }
        `}
      </style>

      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        Chat
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 w-full max-w-md h-screen bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-indigo-700">Ask about Ayush Patel</h2>
                <p className="text-xs text-gray-500">💡 Powered by AI (Mistral via OpenRouter)</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
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
                    msg.role === 'user' ? 'bg-blue-100/80 text-right' : 'bg-gray-100/80 text-left'
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ))}
              {isLoading && (
                <div className="p-3 rounded-md bg-gray-100/80 shadow text-left text-sm text-gray-600 flex items-center">
                  <span className="dot-flash" />
                  <span className="dot-flash" />
                  <span className="dot-flash" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            <div className="px-4 py-2 border-t bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask a question..."
                className="flex-1 border px-3 py-2 rounded text-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}