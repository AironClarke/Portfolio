import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useChatStore } from "../../../stores/useChatStore"
import UserListSkeleton from "@/components/ui/skeletons/UserListSkeleton"

const UserList = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore()

  return (
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2 p-4">
            {isLoading ? (
              <UserListSkeleton />
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3
									rounded-lg cursor-pointer transition-colors
                  ${selectedUser?.clerkId === user.clerkId ? "bg-zinc-800" : "hover:bg-zinc-800/50"}`}
                >

                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default UserList
