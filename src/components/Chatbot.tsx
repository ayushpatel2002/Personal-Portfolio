import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

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
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: '❌ API key missing. Please try again later.',
      }]);
      setIsLoading(false);
      return;
    }

    try {
      console.log('📨 Sent messages:', JSON.stringify(updatedMessages, null, 2));
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: updatedMessages,
          temperature: 0.7,
        }),
      });

      const raw = await response.text();
      console.log('👉 Raw response:', raw);

      let data: any;
      try {
        data = JSON.parse(raw);
        console.log('✅ Parsed JSON response:', JSON.stringify(data, null, 2));
      } catch (jsonError) {
        console.error('❌ Failed to parse JSON:', jsonError);
        console.error("⚠️ API error response:", raw);
        setMessages([
          ...updatedMessages,
          {
            role: 'assistant',
            content: '❌ Could not understand the response. Please try again later.',
          },
        ]);
        setIsLoading(false);
        return;
      }

      const reply = data?.choices?.[0]?.message?.content?.trim() || null;

      if (!response.ok || !reply) {
        console.error('🔍 Server response JSON:', JSON.stringify(data, null, 2));
        console.error('⛔ response.ok:', response.ok);
        console.error('⛔ reply:', reply);
        setMessages([
          ...updatedMessages,
          {
            role: 'assistant',
            content: '❌ Invalid server response. Please try again later.',
          },
        ]);
        setIsLoading(false);
        return;
      }

      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: '❌ Something went wrong. Please try again or check the console for more info.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg focus:outline-none"
        onClick={() => setIsOpen((o) => !o)}
      >
        {isOpen ? '×' : 'Chat'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 max-h-[32rem] bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col p-4"
          >
            <div className="flex-1 space-y-2 overflow-y-auto mb-2">
              {messages.slice(1).map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded ${
                    msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
                  }`}
                >
                  <ReactMarkdown
                    className="text-sm break-words whitespace-pre-wrap"
                    components={{
                      a: ({node, ...props}) => (
                        <a
                          {...props}
                          className="text-blue-600 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                      ul: ({node, ...props}) => (
                        <ul className="list-disc pl-5" {...props} />
                      ),
                      ol: ({node, ...props}) => (
                        <ol className="list-decimal pl-5" {...props} />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isLoading) sendMessage();
                }}
                placeholder="Ask about Ayush Patel..."
                disabled={isLoading}
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
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