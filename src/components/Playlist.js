import React from 'react'

const Playlist = ({ playlist }) => {
  if (playlist.tracks.items.length === 0) {
    return <div>No tracks</div>
  } else {
    return playlist.tracks.items.map((item, index) => (
      <div key={index}>{item.track.name}</div>
    ))
  }
}

export default Playlist
