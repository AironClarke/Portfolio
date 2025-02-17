import { Album } from "lucide-react"
import { Song } from "../models/song.model.js"
import cloudinary from "../lib/cloudinary.js"

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath,{
      resource_type: "auto",
    })
    return result.secure_url
  } catch (error) {
    console.log("Error in uploadToCloudinary ", error)
    throw new Error("Error uploading to cloudinary")
  }
}

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFiles || !req.files.imageFiles) {
      return res.status(400).json({ messgae: "Please upload all files"})
    }

    const { title, artist, albumId, duration} = req.body
    const audioFiles = req.files.audioFiles
    const imageFiles = req.files.imageFiles

    const audioUrl = await uploadToCloudinary(audioFiles)
    const imageUrl = await uploadToCloudinary(imageFiles)

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null
    })

    await song.save()

    // if file belongs to an album, update the songs array
    if(albumId){
      await Album.findbyIdAndUpdate(albumId, {
        $push: { songs: song._id}
      })
    }

    res.status(201).json(song)

  } catch (error) {
    console.log("Error in createSong", error)
    next(error)
  }
}

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params

    const song = await Song.findById(id)

    //if song belongs to an album, update the ablums song array
    if(song.ablumId){
      await Album.findbyIdAndUpdate(song.albumId, {
        $pull: { songs: song._id}
      })
    }

    await Song.findByIdAndDelete(id)

    res.status(200).json({ message: "Song deleted successfully"})

  } catch (error){
    console.log("Error in deleteSong", error)
    next(error)
  }
}

export const createAlbum = async ( req, res, next) => {
  try {
    const {title, artist, releaseYear} = req.body
    const {imageFile} = req.files

    const imageUrl = await uploadToCloudinary(imageFile)

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear
    })

    await album.save()

    res.status(201).json(album);

  } catch (error) {
    console.log("Error in createAlbum", error)
    next(error)
  }
}

export const deleteAlbum = async ( req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ album: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully"})
  } catch (error) {
    console.log("Error in deleteAlbum", error)
    next(error)
  }
}

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true })
}
