import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function Chatbot() {
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

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://your-site.vercel.app',
          'X-Title': 'AyushPortfolioBot'
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
      } catch (jsonError) {
        console.error('❌ Failed to parse JSON:', jsonError);
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

      const reply =
        typeof data?.reply?.content === 'string' && data.reply.content.trim()
          ? data.reply.content
          : typeof data?.message === 'string'
          ? data.message
          : null;

      if (!response.ok || !reply) {
        console.error('Invalid server response:', data);
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
    <div className="chatbot-container p-4 max-w-xl mx-auto bg-white rounded shadow">
      <div className="messages space-y-2 overflow-y-auto max-h-96">
        {messages.slice(1).map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded ${
              msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            <span>{msg.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area flex mt-4 gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !isLoading) sendMessage();
          }}
          placeholder="Ask about Ayush Patel..."
          disabled={isLoading}
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
