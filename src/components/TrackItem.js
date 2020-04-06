import React from 'react'

const TrackItem = ({ track }) => {
  return (
    <div className="card">
      <img
        src={track.album.images[0].url}
        alt=""
        style={{ width: '64px', height: '64px' }}
      />
      <p>name: {track.name}</p>
      {/* <button className="btn btn-dark btn-sm my-1" onClick={() => {}}>
        play
      </button> */}
      <p>artist: {track.artists[0].name}</p>
      <p>album: {track.album.name}</p>
      <button
        className="btn btn-success btn-sm my-1"
        // onClick={() => {
        //   add(track.uri)
        // }}
      >
        add to playlist
      </button>
    </div>
  )
}

export default TrackItem
