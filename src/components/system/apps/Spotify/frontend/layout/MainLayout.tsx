import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar"
import FriendsActivty from "./components/FriendsActivity"
import AudioPlayer from "./components/AudioPlayer"
import { PlaybackControls } from "./components/PaybackControls"

const MainLayout = () => {
  const isMobile = false
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <AudioPlayer />
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow">
        {/* { left sidebar } */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black" />

        {/* Main content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black" />

        {/* right sidebar */}
        <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
          <FriendsActivty />
        </ResizablePanel>


      </ResizablePanelGroup>

      <PlaybackControls />

    </div>
  )
}

export default MainLayout
