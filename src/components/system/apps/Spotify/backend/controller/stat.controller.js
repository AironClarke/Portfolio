import { Album } from "../models/album.model.js"
import { Song } from "../models/song.model.js"
import { User } from "../models/user.model.js"

export const getStats = async (req, res, next) => {

  try {

    const [totalSongs, totalUsers, totalAlbum, uniqueArtist] = await Promise.all([
      Song.countDocuments(),
      User.countDocuments(),
      Album.countDocuments(),

      Song.aggregate([
        {
          $unionWith:{
            coll: "album",
            pipeline: [],
          },
        },
        {
          $group: {
            _id: "$artist",
          },
        },
        {
          $count: "count"
        }
      ])
    ])

    res.status(200).json({
      totalAlbum,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0
    })

  } catch (error) {

  }

}
