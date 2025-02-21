import Topbar from "@/components/ui/Topbar"
import { useChatStore } from "../../stores/useChatStore"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react"
import UserList from "./components/UserList"
import ChatHeader from "./components/chatHeader"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"

const ChatPage = () => {
  const {user} = useUser()
  const { messages, selectedUser, fetchUsers, fetchMessages} = useChatStore()

  useEffect(() => {
    if (user) fetchUsers()
  }, [fetchUsers, user])

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId)
  }, [selectedUser, fetchMessages])

  return (
    <main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
      <Topbar />

      <div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
        <UserList />

        {/* chat message */}
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* Messages */}
              <ScrollArea className="h=[calc(100vh-340px)]">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex items-start gap-3 ${message.senderId == user?.id ? "flex-row-reverse"
                      : "" }`}
                    >
                      <Avatar className="size-8">

                      </Avatar>
                    </div>

                  ))}
                </div>
              </ScrollArea>
            </>
          ) : <NoConversationPlaceholder />
          }
        </div>
      </div>
    </main>
  )
}

export default ChatPage

const NoConversationPlaceholder = () => (
	<div className='flex flex-col items-center justify-center h-full space-y-6'>
		<img src='/spotify.png' alt='Spotify' className='size-16 animate-bounce' />
		<div className='text-center'>
			<h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
			<p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
		</div>
	</div>
);
