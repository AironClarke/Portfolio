import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "../../stores/useAuthStore"
import DashboardStats from "./components/DashboardStats"
import Header from "./components/Header"
import { Album, Music } from "lucide-react"
import AlbumsTabContent from "./components/AlbumsTabContent"
import SongsTabContent from "./components/SongsTabContent"
import { useEffect, useState } from "react"
import { useMusicStore } from "../../stores/useMusicStore"

const AdminPage = () => {

  const {isAdmin, isLoading} = useAuthStore()
  const [refresh, setRefresh] = useState(0);

  const {fetchAlbums, fetchSongs, fetchStats} = useMusicStore()

  const handleRefresh = async () => {
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    fetchAlbums()
    fetchSongs()
    fetchStats()
  }, [refresh])

  if(!isAdmin && isLoading) return <div>Unauthorized</div>

  return <div className="min-h-screen bg-gradient-to-b from-zinc-900
   to-black text-zinc-100 p-8">
      <Header />

      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">

          <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700">
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>

          <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700">
            <Album className="mr-2 size-4" />
            Album
          </TabsTrigger>

        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent onRefresh={handleRefresh} />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent onRefresh={handleRefresh} />
        </TabsContent>

      </Tabs>
    </div>
}

export default AdminPage
