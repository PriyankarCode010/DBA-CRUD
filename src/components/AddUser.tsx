"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = async () => {
    if (!name || !email) return alert("Please fill all fields");
    try {
      await addDoc(collection(db, "users"), { name, email });
      alert("User added successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add User</h2>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded mb-2 block w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded mb-2 block w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleAddUser}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add User
      </button>
    </div>
  );
}
