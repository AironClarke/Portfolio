import {create} from "zustand"
import {Song} from "../types/index"

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initalizeQueue: (songs: Song[]) => void;
  playAlbum: (song: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  initalizeQueue: (songs: Song[]) => {
    set({
      queue:songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
    })
  },

  playAlbum: (songs: Song[], startIndex=0) => {
    if(songs.length === 0 ) return

    const song = songs[startIndex]

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true
    })
  },

  setCurrentSong: (song: Song | null) => {
    if(!song) return

    const songIndex = get().queue.findIndex(s => s._id === song._id)
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex: get().currentIndex
    })
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying

    // negate the state of the isPlaying boolean
    set({
      isPlaying: willStartPlaying
    });

  },

  playNext: () => {
    const { currentIndex, queue } = get()
    const nextIndex = currentIndex + 1

    // if there is a next song to play, lets play it
    if(nextIndex < queue.length) {
      const nextSong = queue[nextIndex]
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true
      })
    } else {
      // no next song
      set({ isPlaying: false})
    }
  },

  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1

    // there are prev songs
    if(prevIndex >= 0) {
      const prevSong = queue[prevIndex]
      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true
      })
    } else {
      // no prev songs
      set({ isPlaying: false })
    }
  }
}))
