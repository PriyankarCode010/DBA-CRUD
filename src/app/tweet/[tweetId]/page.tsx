"use client";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaArrowLeft, FaArrowRightArrowLeft, FaBackward } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};

const Page = (props: Props) => {
  const { tweetId }: { tweetId: string } = useParams();
  const [tweet, setTweet] = useState<any>(null);

  const getTweetById = async () => {
    try {
      const tweetDocRef = doc(db, "chats", tweetId); // Reference to tweet document
      const tweetSnapshot = await getDoc(tweetDocRef); // Fetch document

      if (tweetSnapshot.exists()) {
        return { id: tweetSnapshot.id, ...tweetSnapshot.data() }; // Return tweet data
      } else {
        console.log("Tweet not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching tweet:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTweet = async () => {
      const data = await getTweetById(); // Call the function
      setTweet(data); // Store tweet in state
    };

    if (tweetId) fetchTweet();
  }, [tweetId]);

  return tweet ? (
    <div className="bg-[#18181a] min-h-screen">
      <div className="w-full flex justify-between items-center px-3">
        <a href="/home" className="text-white flex items-center gap-2 cursor-pointer hover:underline"><FaArrowLeft /> Back</a>

        <div className="flex gap-2 items-center">
          <div className="flex flex-col items-end">
            <span className="font-medium text-white">{tweet.name}</span>
            <span className="text-zinc-500 text-sm">@{tweet.author}</span>
            {/* <span className="text-zinc-500">· 4h</span> */}
          </div>
          <Avatar>
            <AvatarImage src={tweet.photoUrl} />
            <AvatarFallback>
              {tweet ? tweet.name[0] : "X"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex justify-center items-center bg-[#18181a] p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full"
        >
          <Card className="shadow-lg rounded-2xl bg-slate-200 p-6">
            <CardContent>
              <h4 className="font-bold text-3xl text-gray-800 mb-4">
                {tweet.title}
              </h4>
              <p className="text-gray-700 leading-relaxed">{tweet.content}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  ) : (
    <div className="bg-[#18181a] min-h-screen flex justify-between items-center w-full font-semibold text-3xl text-white">Loading</div>
  );
};

export default Page;
