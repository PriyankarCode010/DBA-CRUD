"use client";

import { useEffect, useState } from "react";

interface Chat {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
  votes: Record<string, string>;
  likes: Record<string, string>;
  replies: { userId: string; username: string; content: string; timestamp: string }[];
}

const userId = "123";

export default function ChatApp() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const res = await fetch("/api/chat");
    const data = await res.json();
    setChats(data);
  };

  const addMessage = async () => {
    await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ userId, username: "JohnDoe", content: newMessage }),
    });
    setNewMessage("");
    fetchChats();
  };

  const vote = async (id: string, type: "upvote" | "downvote") => {
    await fetch("/api/chat", {
      method: "PUT",
      body: JSON.stringify({ id, userId, voteType: type }),
    });
    fetchChats();
  };

  const like = async (id: string, action: "like" | "dislike") => {
    await fetch("/api/chat", {
      method: "PATCH",
      body: JSON.stringify({ id, userId, action }),
    });
    fetchChats();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Reddit-Style Chat</h1>

      <input
        type="text"
        placeholder="Type a message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button onClick={addMessage} className="bg-blue-500 text-white p-2 rounded mt-2">
        Send
      </button>

      {chats.map((chat) => {
        const userVote = chat.votes?.[userId]; 
        const userReaction = chat.likes?.[userId]; 

        return (
          <div key={chat.id} className="border p-4 rounded mt-4">
            <p><strong>{chat.username}:</strong> {chat.content}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => vote(chat.id, "upvote")}
                className={`p-2 rounded ${userVote === "upvote" ? "bg-green-500 text-white" : "bg-gray-200"}`}
              >
                👍 {Object.values(chat.votes || {}).filter(v => v === "upvote").length}
              </button>

              <button
                onClick={() => vote(chat.id, "downvote")}
                className={`p-2 rounded ${userVote === "downvote" ? "bg-red-500 text-white" : "bg-gray-200"}`}
              >
                👎 {Object.values(chat.votes || {}).filter(v => v === "downvote").length}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
