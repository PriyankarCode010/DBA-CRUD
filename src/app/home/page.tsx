"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Heart,
  Share2,
  Code2,
  Terminal,
  Hash,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TweetCard from "@/components/TweetCard";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [activeTab, setActiveTab] = useState("following");
  const [tweets, setTweets] = useState<any>();
  const chatsCollectionRef = collection(db, "chats")

  const getTweets = async () => {
    try {
        const data = await getDocs(chatsCollectionRef);
        const filterData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        // console.log(filterData)
        setTweets(filterData)
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    getTweets();
}, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto p-4">
        <header className="sticky top-0 backdrop-blur-xl bg-black/50 z-10 py-4 mb-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            DevFeed
          </h1>
          <Tabs defaultValue="following" className="mt-4">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
          </Tabs>
        </header>

        <main className="space-y-4">
          {
            tweets?
            tweets.map((tw:any) => 
              <TweetCard key={tw.id} user={auth} tweet={tw} />
            )
            :
            "No tweets available!"
          }
        </main>
      </div>
    </div>
  );
}
