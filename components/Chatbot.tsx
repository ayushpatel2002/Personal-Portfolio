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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      let data: any;
      let raw = await response.text();
      console.log('👉 Raw response:', raw);
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

      const reply = typeof data?.reply?.content === 'string' && data.reply.content.trim() !== ''
        ? data.reply.content
        : null;

      if (!response.ok || !reply) {
        console.error('Invalid server response:', data);
        console.log('Full raw response content:', raw);
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
      setIsLoading(false);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: '❌ Something went wrong. Please try again or check the console for more info.',
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="fixed bottom-6 right-6 w-80 shadow-xl rounded-xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-gray-300 p-4 animate-fade-in backdrop-blur-sm">
        <div className="h-48 overflow-y-auto text-sm mb-2">
          {messages.slice(1).map((msg, idx) => (
            <div key={idx + '-' + msg.role + '-' + msg.content.slice(0, 10)} className={msg.role === 'user' ? 'text-right text-purple-700' : 'text-left text-gray-900'}>
              <p className="my-1 whitespace-pre-wrap">{msg.content || '[Empty message]'}</p>
            </div>
          ))}
          {isLoading && <div className="text-left text-gray-500 italic">Typing...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            className="border border-gray-300 rounded-full px-3 py-1 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm transition" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
}
