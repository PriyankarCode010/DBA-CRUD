import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { LogOut } from "lucide-react"
import Link from "next/link"

type SidebarProps = {
  activePage: "home" | "account" | "recentChats" | "connections"
}

export function Sidebar({ activePage }: SidebarProps) {
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
    <div className="w-full lg:w-64 space-y-1 pt-2 flex flex-col gap-0.5">
      {/* <div className="text-sm text-zinc-500 mb-2">USER SETTINGS</div> */}
      <Link href="/home" passHref>
        <Button
          variant="ghost"
          className={`w-full justify-start px-3 py-2 ${
            activePage === "home" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          Home
        </Button>
      </Link>
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
  )
}

