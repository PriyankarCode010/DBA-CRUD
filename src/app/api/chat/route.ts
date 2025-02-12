import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

// 🔹 ADD a new chat message or reply to existing message
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { type, userId, username, content, id } = data;

    if (!userId || !username || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (type === "reply") {
      if (!id) {
        return NextResponse.json({ error: "Missing message ID for reply" }, { status: 400 });
      }

      const chatRef = doc(db, "chats", id);
      const reply = {
        userId,
        username,
        content,
        timestamp: serverTimestamp(),
        upvotes: [],
        downvotes: [],
        likes: [],
      };

      await updateDoc(chatRef, {
        replies: arrayUnion(reply),
      });

      return NextResponse.json({ message: "Reply added successfully" });
    } else {
      const chatRef = collection(db, "chats");
      const newChat = {
        userId,
        username,
        content,
        timestamp: serverTimestamp(),
        upvotes: [],
        downvotes: [],
        likes: [],
        replies: [],
      };

      const docRef = await addDoc(chatRef, newChat);
      return NextResponse.json({ id: docRef.id, message: "Chat created successfully" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

// 🔹 FETCH all chat messages
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "chats"));
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
  }
}

// 🔹 UPVOTE or DOWNVOTE a message
export async function PUT(req: Request) {
  try {
    const { id, userId, voteType } = await req.json();
    if (!id || !userId || !["upvote", "downvote"].includes(voteType)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const chatRef = doc(db, "chats", id);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) return NextResponse.json({ error: "Chat not found" }, { status: 404 });

    const chatData = chatSnap.data();
    const updatedVotes = chatData.votes || {};

    if (updatedVotes[userId] === voteType) {
      delete updatedVotes[userId]; // Remove vote if the user clicks again
    } else {
      updatedVotes[userId] = voteType; // Assign new vote
    }

    await updateDoc(chatRef, { votes: updatedVotes });

    return NextResponse.json({ message: "Vote updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update vote" }, { status: 500 });
  }
}

// 🔹 LIKE or UNLIKE a message
export async function PATCH(req: Request) {
    try {
      const { id, userId, action } = await req.json();
      if (!id || !userId || !["like", "dislike"].includes(action)) {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
      }
  
      const chatRef = doc(db, "chats", id);
      const chatSnap = await getDoc(chatRef);
  
      if (!chatSnap.exists()) return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  
      const chatData = chatSnap.data();
      let updatedLikes = chatData.likes || {};
  
      if (updatedLikes[userId] === action) {
        delete updatedLikes[userId]; // Remove reaction if clicked again
      } else {
        updatedLikes[userId] = action; // Assign new reaction
      }
  
      await updateDoc(chatRef, { likes: updatedLikes });
  
      return NextResponse.json({ message: "Like/Dislike updated successfully" });
    } catch (error) {
      return NextResponse.json({ error: "Failed to update reaction" }, { status: 500 });
    }
  }
  

// 🔹 DELETE a chat message
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Message ID required" }, { status: 400 });

    await deleteDoc(doc(db, "chats", id));
    return NextResponse.json({ message: "Chat deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete chat" }, { status: 500 });
  }
}
