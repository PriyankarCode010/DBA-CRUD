"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/SideBar";

export default function RecentChatsPage() {
  // This is just mock data. Replace with actual data in a real application.
  const recentChats = [
    { id: 1, name: "Alice Johnson", lastMessage: "Hey, how's it going?", time: "2 hours ago" },
    { id: 2, name: "Bob Smith", lastMessage: "Did you see the game last night?", time: "Yesterday" },
    { id: 3, name: "Carol Williams", lastMessage: "Thanks for your help!", time: "2 days ago" },
  ]

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6 group">
          <ChevronLeft className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar activePage="recentChats" />

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Recent Chats</h1>

            <Card className="bg-zinc-800 border-none text-white">
              <CardHeader>
                <CardTitle>Your Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                {recentChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center justify-between py-4 border-b border-zinc-700 last:border-b-0"
                  >
                    <div>
                      <h3 className="font-semibold">{chat.name}</h3>
                      <p className="text-sm text-zinc-400">{chat.lastMessage}</p>
                    </div>
                    <div className="text-xs text-zinc-500">{chat.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

