"use client";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type SidebarProps = {
  activePage: "home" | "account" | "recentChats" | "connections";
  getTweets?: any;
};

export function Sidebar({ activePage, getTweets }: SidebarProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const tweetsCollectionRef = collection(db, "chats");
  const [open, setOpen] = useState(false);

  const handleNewPost = async () => {
    try {
      await addDoc(tweetsCollectionRef, {
        name: auth?.currentUser?.displayName,
        title: title,
        content: content,
        author: auth?.currentUser?.email,
        photoUrl: auth?.currentUser?.photoURL,
        createdAt: serverTimestamp(),
      });
      getTweets();
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Successfully signed out.");
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
      // Handle Errors here, e.g., display a message to the user:
      alert("Error during logout: " + error); // Example using alert
    }
  };
  return (
    <div className="w-full lg:w-64 space-y-1 pt-2 flex flex-col gap-0.5 fixed">
      {/* <div className="text-sm text-zinc-500 mb-2">USER SETTINGS</div> */}
      <Link href="/home" passHref>
        <Button
          variant="ghost"
          className={`w-full justify-start px-3 py-2 ${
            activePage === "home"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          Home
        </Button>
      </Link>
      <Link href="/profile" passHref>
        <Button
          variant="ghost"
          className={`w-full justify-start px-3 py-2 ${
            activePage === "account"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          My Account
        </Button>
      </Link>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-white font-semibold text-sm text-black px-3 py-1 rounded-full">
          NEW POST +
        </DialogTrigger>
        <DialogContent className="bg-[#262626] border-none">
          <DialogHeader>
            <DialogTitle className="text-white/40 font-medium hidden">
              Write your thoughts...
            </DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title your blog..."
              className="border-b-2 border-slate-500 focus:outline-none active:outline-none bg-[#262626] text-white w-full mb-2"
            />
            <textarea
              className="border-2 p-2 rounded-md border-slate-500 focus:outline-none active:outline-none bg-[#262626] text-white w-full"
              rows={20}
              placeholder="Write your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <Button
            className="bg-white text-black font-semibold"
            onClick={() => {
              handleNewPost();
              setOpen(false);
            }}
          >
            Post
          </Button>
        </DialogContent>
      </Dialog>

      {/* <Link href="/profile/recent-chats" passHref>
        <Button
          variant="ghost"
          className={`w-full justify-start px-3 py-2 ${
            activePage === "recentChats" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          Recent Chats
        </Button>
      </Link>
      <Link href="/profile/connections" passHref>
        <Button
          variant="ghost"
          className={`w-full justify-start px-3 py-2 ${
            activePage === "connections" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          Connections
        </Button>
      </Link> */}
      <Button
        variant="ghost"
        className="w-full justify-start px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-red-500 mt-4"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}
