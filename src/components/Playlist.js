import React from 'react'
import PlaylistItem from './PlaylistItem'

const Playlist = ({ playlist }) => {
  if (playlist.length === 0) {
    return <div>No tracks</div>
  } else {
    return playlist.map((item, index) => (
      <PlaylistItem key={index} track={item} />
    ))
  }
}

export default Playlist
