import React from 'react'
import "index.css"

// import "index.css" ???
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function Spotify(){
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  )
}

export default Spotify
