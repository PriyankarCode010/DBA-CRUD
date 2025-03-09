"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sidebar } from "@/components/SideBar";
import { auth, db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import TweetCard from "@/components/TweetCard";

export default function ProfilePage() {
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
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* <Link href="/home" className="inline-flex items-center text-zinc-400 hover:text-white mb-6 group">
          <ChevronLeft className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
          Back
        </Link> */}

        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar activePage="account" getTweets={getTweets} />

          {/* Main Content */}
          <div className="flex w-full justify-center">
            <div className="flex-1 max-w-3xl">
              <h1 className="text-2xl font-bold mb-6">My Account</h1>

              <Card className="bg-zinc-800 border-none text-white">
                <CardHeader className="flex flex-row items-center gap-4 py-7">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={auth.currentUser?.photoURL!}
                      alt="Profile picture"
                    />
                    <AvatarFallback>
                      {auth.currentUser?.displayName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {auth.currentUser?.displayName}
                    </h2>
                    <h2 className="text-lg font-medium text-white/60">
                      {auth.currentUser?.email}
                    </h2>
                    {/* <Button variant="secondary" className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white">
                    Edit User Profile
                  </Button> */}
                  </div>
                </CardHeader>
              </Card>

              <h1 className="text-2xl my-3 font-semibold">My Tweets...</h1>
              <main className="space-y-4">
                {tweets
                  ? tweets
                      .filter(
                        (tw: any) => tw.author === auth.currentUser?.email
                      )
                      .map((tw: any) => (
                        <TweetCard key={tw.id} user={auth} tweet={tw} isProfile={true} getTweets={getTweets} />
                      ))
                  : "No tweets available!"}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
