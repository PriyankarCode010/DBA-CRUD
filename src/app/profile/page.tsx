"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Edit, Lock } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/SideBar"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6 group">
          <ChevronLeft className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar activePage="account" />

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">My Account</h1>

            <Card className="bg-zinc-800 border-none text-white">
              <CardHeader className="flex flex-row items-center gap-4 pb-0">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EYceHp4dk9K4DnOYSrlZH3AbFI0wrz.png"
                    alt="Profile picture"
                  />
                  <AvatarFallback>3X</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">3XS ä3ä</h2>
                  <Button variant="secondary" className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white">
                    Edit User Profile
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-xs text-zinc-400">DISPLAY NAME</Label>
                      <div className="text-white">3XS ä3ä</div>
                    </div>
                    <Button variant="secondary" size="sm" className="bg-zinc-700 hover:bg-zinc-600">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-xs text-zinc-400">USERNAME</Label>
                      <div className="text-white">3xsa3a</div>
                    </div>
                    <Button variant="secondary" size="sm" className="bg-zinc-700 hover:bg-zinc-600">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-xs text-zinc-400">EMAIL</Label>
                      <div className="text-white">••••••••••@gmail.com</div>
                    </div>
                    <Button variant="secondary" size="sm" className="bg-zinc-700 hover:bg-zinc-600">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-xs text-zinc-400">PHONE NUMBER</Label>
                      <div className="text-white">••••••••5484</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="link" className="text-zinc-400 hover:text-white">
                        Remove
                      </Button>
                      <Button variant="secondary" size="sm" className="bg-zinc-700 hover:bg-zinc-600">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-zinc-700" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Password and Authentication</h3>
                  <div className="flex gap-4">
                    <Button className="bg-indigo-500 hover:bg-indigo-600">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="secondary" className="bg-indigo-500 hover:bg-indigo-600">
                      Enable Authenticator App
                    </Button>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Protect your account with an extra layer of security. Once configured, you'll be required to enter
                    your password and complete one additional step in order to sign in.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

