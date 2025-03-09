"use client";
import { Auth } from "firebase/auth";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Edit, Hash, Heart, MessageSquare, Share2, Trash2 } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { format } from "date-fns"
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

type Props = {
  user: Auth;
  tweet: {
    id: string;
    name: string;
    content: string;
    author: string;
    createdAt: Timestamp;
  };
  getTweets?: any;
  isProfile: boolean;
};

const TweetCard = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(props.tweet.content);
  const tweetsCollectionRef = collection(db, "chats");

  const handleEditPost = async () => {
    try {
      const tweetDocRef = doc(tweetsCollectionRef, props.tweet.id); // Reference to the tweet document
      await updateDoc(tweetDocRef, {
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

  const formatTimestamp = (timestamp:Timestamp) => {
    if (!timestamp) return "Loading...";
    return format(timestamp.toDate(), "MMM dd, yyyy HH:mm"); // Example: Jan 15, 2025 14:30
  };

  return (
    <>
      <Card className="bg-zinc-800 border-zinc-800">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={auth.currentUser?.photoURL!} />
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
                          <Edit className="text-white h-4 cursor-pointer" />
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
                            <textarea
                              className="border-none focus:outline-none active:outline-none bg-[#262626] text-white w-full"
                              rows={10}
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
              <p className="mt-2 text-xl text-white">{props.tweet.content}</p>
              <span className="text-zinc-500 text-xs">{formatTimestamp(props.tweet.createdAt)}</span>

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
