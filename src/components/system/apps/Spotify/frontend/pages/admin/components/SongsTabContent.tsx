import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"
import SongsTable from "./SongsTable"
import AddSongDialog from "./AddSongDialog"
import { TabContentProps } from "../../../types"

const SongsTabContent = ({ onRefresh }: TabContentProps) => {
  return (

    <Card className="bg-zinc-800/50 border-zinc-700/50">
      <CardHeader>
        <div className="flex item-center justify-between ">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              Songs Library
            </CardTitle>
            <CardDescription>Manage your music tracks</CardDescription>
          </div>
          <AddSongDialog onRefresh={onRefresh} />
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>

  )
}

export default SongsTabContent
