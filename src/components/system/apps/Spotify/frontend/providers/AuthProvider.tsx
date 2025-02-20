import { axiosInstance } from "@/lib/axios"
import { ClerkLoading, useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { Loader } from "lucide-react"

import { useEffect, useState} from "react"
import { useAuthStore } from "../stores/useAuthStore"
import { useChatStore } from "../stores/useChatStore"

const updateApiToken = (token:string | null) => {
  if(token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers.common[`Authorization`]
  }
}

const AuthProvider = ({children}:{children: React.ReactNode }) => {
  const {getToken,userId} = useAuth()
  const [loading, setLoading] = useState(true)
  const {checkAdminStatus} = useAuthStore()
  const {initSocket, disconnectSocket} = useChatStore()

  useEffect(() => {
    const initAuth = async () => {
      try{
        const token = await getToken()
        updateApiToken(token)
        if(token) {
          await checkAdminStatus()
          // inti socket
          if(userId) initSocket(userId)
        }
      } catch(error) {
        updateApiToken(null)
        console.log("Error in auth provider")

      } finally {
        setLoading(false)
      }
    }
    initAuth()

    // cleanup
    return () => disconnectSocket()

  }, [getToken,userId,checkAdminStatus,initSocket,disconnectSocket])

  if(loading) return (
    <div className="h-screen w-screen flex items-center justify-center">
        <Loader className="size-8 animate-spin text-emerald-500" />
    </div>
  )


  return <>{children}</>
}

export default AuthProvider
