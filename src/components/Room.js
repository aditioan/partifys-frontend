import React from 'react'
import Search from './Search'

const Room = ({ token }) => {
  return (
    <div>
      <div>This is the host's room</div>
      <div>token= {token}</div>
      <div>Here is the shared play list</div>
      <Search token={token} />
    </div>
  )
}

export default Room
