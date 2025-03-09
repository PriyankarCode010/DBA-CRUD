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
import { Sidebar } from "@/components/SideBar";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  const [activeTab, setActiveTab] = useState("following");
  const [tweets, setTweets] = useState<any>();
  const chatsCollectionRef = collection(db, "chats");

  const getTweets = async () => {
    try {
      const data = await getDocs(chatsCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filterData)
      setTweets(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <div className="min-h-screen bg-[#18181a] text-white ">
      {/* <div className="text-2xl font-extrabold flex justify-center items-center text-white/70">
        PESU-
        <FaXTwitter className="z-50 text-white" />
      </div> */}
      <div className="flex px-4 py-8">
        <Sidebar activePage="home" getTweets={getTweets} />

        <div className="max-w-3xl mx-auto w-full p-4">
          <header className="sticky top-0 backdrop-blur-xl z-10 py-4 mb-4">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Terminal className="w-6 h-6" />
              TweetFeed
            </h1>
            {/* <Tabs defaultValue="following" className="mt-4">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
            </Tabs> */}
          </header>

          <main className="space-y-4">
            {tweets
              ? tweets.map((tw: any) => (
                  <TweetCard key={tw.id} user={auth} tweet={tw} getTweets={getTweets} isProfile={false} />
                ))
              : "No tweets available!"}
          </main>
        </div>
      </div>
    </div>
  );
}
