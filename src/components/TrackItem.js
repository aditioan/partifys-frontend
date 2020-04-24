import React from 'react'

const TrackItem = ({ track, addToPlaylist }) => {
  //console.log(track)
  return (
    <div className="collection-item">
      <img
        src={track.album.images[0].url}
        alt=""
        style={{ width: '64px', height: '64px', display: 'inline-block' }}
      />
      <span>{track.name}</span>
      <a
        href="#"
        className="secondary-content"
        onClick={() => {
          addToPlaylist(track.uri, track.name, track.album.images[0].url)
        }}
      >
        <i className="material-icons">add_circle_outline</i>
      </a>
      <span> | </span>
      <span className="green-text">artist: {track.artists[0].name}</span>
      <span> | </span>
      <span className="blue-text">album: {track.album.name}</span>
    </div>
  )
}

export default TrackItem
