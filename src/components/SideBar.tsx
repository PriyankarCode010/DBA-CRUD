import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"

type SidebarProps = {
  activePage: "account" | "recentChats" | "connections"
}

export function Sidebar({ activePage }: SidebarProps) {
  return (
    <div className="w-full lg:w-64 space-y-1">
      <div className="text-sm text-zinc-500 mb-2">USER SETTINGS</div>
      <Link href="/profile" passHref>
        <Button
          variant="ghost"
          className={`w-full justify-start px-3 py-2 ${
            activePage === "account" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          My Account
        </Button>
      </Link>
      <Link href="/recent-chats" passHref>
        <Button
          variant="ghost"
          className={`w-full justify-start px-3 py-2 ${
            activePage === "recentChats" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          Recent Chats
        </Button>
      </Link>
      <Link href="/connections" passHref>
        <Button
          variant="ghost"
          className={`w-full justify-start px-3 py-2 ${
            activePage === "connections" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          Connections
        </Button>
      </Link>
      <Button
        variant="ghost"
        className="w-full justify-start px-3 py-2 text-zinc-400 hover:bg-zinc-800 mt-4"
        onClick={() => {
          // Add logout logic here
          console.log("Logout clicked")
        }}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  )
}

