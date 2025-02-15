import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/Homepage"
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layout/MainLayout"
import ChatPage from "./pages/chat/chatPage"
import { AlbumPage } from "./pages/album/AlbumPage"
import "index.css"
import AdminPage from "./pages/admin/AdminPages"

function App() {

  return (
    <>
      <Routes>

        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback/>} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
