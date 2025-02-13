import { Auth } from "firebase/auth";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Hash, Heart, MessageSquare, Share2 } from "lucide-react";

type Props = {
  user: Auth;
  tweet: {
    username: string;
    content: string;
  };
};

const TweetCard = (props: Props) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>
              {props.tweet
                ? props.tweet.username[0]
                : "X"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">
                {props.tweet.username}
              </span>
              <span className="text-zinc-500">
                @{props.tweet.username}
              </span>
              <span className="text-zinc-500">· 4h</span>
            </div>
            <p className="mt-2 text-sm text-white/70">
              {props.tweet.content}
            </p>

            <div className="flex gap-6 mt-4">
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TweetCard;
