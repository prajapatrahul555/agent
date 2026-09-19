"use client";

import { useState, useEffect } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.data);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="space-y-4">
        {messages.map((m: any) => (
          <div key={m._id} className="p-4 border rounded shadow">
            <p className="text-sm font-semibold">To/From: {m.receiverId}</p>
            <p className="mt-2">{m.content}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(m.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
