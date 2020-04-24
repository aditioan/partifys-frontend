import React from 'react'

const PlaylistItem = ({ track }) => {
  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <img
        src={track.image}
        alt=""
        style={{
          width: '64px',
          height: '64px',
          display: 'inline-block',
          margin: 5,
        }}
      />
      <span>{track.name}</span>
      <a href="#" className="secondary-content" onClick={() => {}}>
        <i className="material-icons" style={{ margin: 10 }}>
          thumb_up
        </i>
      </a>
    </div>
  )
}

export default PlaylistItem
