"use client";
import { Auth } from "firebase/auth";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Edit, Hash, Heart, MessageSquare, Share2, Trash2 } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useRouter } from "next/navigation";

type Props = {
  user: Auth;
  tweet: {
    id: string;
    name: string;
    title: string;
    content: string;
    author: string;
    photoUrl: string;
    createdAt: Timestamp;
  };
  getTweets?: any;
  isProfile: boolean;
};

const TweetCard = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.tweet.title);
  const [content, setContent] = useState(props.tweet.content);
  const tweetsCollectionRef = collection(db, "chats");

  const router = useRouter();

  const handleEditPost = async () => {
    try {
      const tweetDocRef = doc(tweetsCollectionRef, props.tweet.id); // Reference to the tweet document
      await updateDoc(tweetDocRef, {
        title: title,
        content: content,
        createdAt: serverTimestamp(), // Updating the content
      });
      props.getTweets(); // Refresh tweets after update
      setOpen(false); // Close modal after editing
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const tweetDocRef = doc(tweetsCollectionRef, props.tweet.id); // Reference to the tweet document
      await deleteDoc(tweetDocRef);
      props.getTweets(); // Refresh tweets after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const formatTimestamp = (timestamp: Timestamp) => {
    if (!timestamp) return "Loading...";
    return format(timestamp.toDate(), "MMM dd, yyyy HH:mm"); // Example: Jan 15, 2025 14:30
  };

  return (
    <>
      <Card className="bg-zinc-800 border-zinc-800">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={props.tweet.photoUrl || "https://i.pinimg.com/736x/85/e6/47/85e64767b129d2cae2d1c47b1ed0aece.jpg"} />
              <AvatarFallback>
                {props.tweet ? props.tweet.name[0] : "X"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-white">
                    {props.tweet.name}
                  </span>
                  <span className="text-zinc-500 text-sm">
                    @{props.tweet.author}
                  </span>
                  {/* <span className="text-zinc-500">· 4h</span> */}
                </div>
                <>
                  {props.isProfile &&
                  props.tweet.author === auth.currentUser?.email ? (
                    // <Edit className="text-white h-4 cursor-pointer" />
                    <div className="flex gap-2">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                          {/* NEW POST + */}
                          <Edit className="text-white h-4 cursor-pointer z-50" />
                        </DialogTrigger>
                        <DialogContent className="bg-[#262626] border-none">
                          <DialogHeader>
                            <DialogTitle className="text-white/40 font-medium hidden">
                              <Edit className="text-white h-4 cursor-pointer" />
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
                              handleEditPost();
                              setOpen(false);
                            }}
                          >
                            Confirm Edit
                          </Button>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Trash2 className="text-red-500 h-4 cursor-pointer" />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#262626] border-none">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-300">
                              This action cannot be undone. This will
                              permanently delete your tweet.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="text-red-500"
                              onClick={handleDeletePost}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              </div>
              <p
                className="mt-2 text-xl text-white cursor-pointer hover:underline"
                onClick={() => router.push(`/tweet/${props.tweet.id}`)}
              >
                {props.tweet.title}
              </p>
              <span className="text-zinc-500 text-xs">
                {formatTimestamp(props.tweet.createdAt)}
              </span>

              {/* <div className="flex gap-6 mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-500 hover:text-red-500 hover:bg-transparent"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  69
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-500 hover:text-green-500 hover:bg-transparent"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  15
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-500 hover:text-blue-500 hover:bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />8
                </Button>
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TweetCard;
