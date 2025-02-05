import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton>
            <Button className="bg-red-100">Sign in</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <h1 className="text-3x1 font-bold underline">Hello</h1>
    </>
  )
}

export default App
