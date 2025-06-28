import React, { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'You are a helpful assistant that only answers based on Ayush Patel’s portfolio. Respond with relevant information only.' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMessages })
    });
    const data = await response.json();
    setMessages([...updatedMessages, data.reply]);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 shadow-lg rounded-xl bg-white border p-4 animate-fade-in">
      <div className="h-48 overflow-y-auto text-sm mb-2">
        {messages.slice(1).map((msg, idx) => (
          <div key={idx} className={msg.role === 'user' ? 'text-right text-blue-700' : 'text-left text-gray-800'}>
            <p className="my-1">{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border rounded w-full p-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
