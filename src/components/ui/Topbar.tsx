import { SignedOut, SignedIn, SignOutButton, UserButton } from "@clerk/clerk-react"
import { LayoutDashboardIcon } from "lucide-react"
import { Link } from "react-router-dom"
import SignInOAuthButtons from "./SignInOAuthButtons"
import { useAuthStore } from "../system/apps/Spotify/frontend/stores/useAuthStore"
import { buttonVariants } from "./button"
import { cn } from "@/lib/utils"

const Topbar = () => {
  const {isAdmin} = useAuthStore()
  console.log({isAdmin})

  return (
    <div className="flex items-center justify-between p-4
    sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" className="size-8" alt="Spotify logo"/>
        Spotify
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={"/admin"}
          className={cn(buttonVariants({ variant: "outline" }), "bg-zinc-900 text-white hover:bg-zinc-700 hover:text-white")}>
            <LayoutDashboardIcon className="size-4 mr-4 "/>
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  )
}

export default Topbar
