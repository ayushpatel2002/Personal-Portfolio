import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content:
        "You are a helpful assistant that only answers based on Ayush Patel’s portfolio. Respond with relevant information only.",
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

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <motion.section
      id="chatbot"
      className="p-8 bg-gray-800 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-1">👋 Ask me anything about Ayush’s experience, projects, or skills!</h2>
      <p className="text-xs text-gray-400 mb-4">AI-powered</p>
      <div className="h-64 overflow-y-auto space-y-2 mb-4">
        {messages.slice(1).map((msg, idx) => (
          <motion.div
            key={idx}
            className={`p-3 max-w-md rounded-xl text-sm whitespace-pre-wrap ${
              msg.role === 'user' ? 'bg-blue-600 text-right ml-auto' : 'bg-gray-700'
            }`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ReactMarkdown className="prose prose-invert text-sm m-0">{msg.content}</ReactMarkdown>
          </motion.div>
        ))}
        {isLoading && (
          <div className="p-3 rounded-xl bg-gray-700 text-sm text-gray-300 flex gap-1">
            <span className="animate-pulse">.</span>
            <span className="animate-pulse">.</span>
            <span className="animate-pulse">.</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => sendMessage(prompt)}
            className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full"
          >
            {prompt}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your question..."
          className="flex-1 bg-gray-700 placeholder-gray-400 px-3 py-2 rounded text-sm"
          disabled={isLoading}
        />
        <button
          onClick={() => sendMessage()}
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500 disabled:opacity-50 text-sm"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </motion.section>
  );
}
