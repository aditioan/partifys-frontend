import React, { useEffect, useState } from 'react'
import Search from './Search'
import axios from 'axios'
import Playlist from './Playlist'
import io from 'socket.io-client'

let socket

const Room = ({ room }) => {
  const [playlist, setPlaylist] = useState(null)

  const getPlaylist = async (room) => {
    const res = await axios.get(
      `http://localhost:3001/room/tracks?room=${room}`
    )

    console.log(res.data)

    setPlaylist(res.data)
  }

  const addToPlaylist = async (uri, name, image) => {
    try {
      const res = await axios.post('http://localhost:3001/room/add_track', {
        room: room,
        uri: uri,
        name,
        image,
      })
      console.log(res.data.msg)
    } catch (err) {
      console.error(err.response.data.msg)
      return
    }

    socket.emit('changedList')
  }

  //after window load, get play list
  useEffect(() => {
    getPlaylist(room)
  }, [])

  //In the full lifecycle of the room component, the socket is alive
  useEffect(() => {
    socket = io('localhost:3001')

    socket.on('refreshList', () => {
      getPlaylist(room)
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [])

  // const sentHostInfo = async () => {
  //   const res = await axios({
  //     method: 'post',
  //     url: 'http://localhost:3001/room_info',
  //     data: {
  //       room: room,
  //       token: token,
  //     },
  //   })

  //   console.log(res)
  // }

  return (
    <div className="container">
      <h3>Party Room {room}</h3>
      {playlist === null ? (
        <h3>Loading playlist...</h3>
      ) : (
        <div>
          <h5>party playlist</h5>
          <Playlist playlist={playlist} />
          <Search room={room} addToPlaylist={addToPlaylist} />
        </div>
      )}
    </div>
  )
}

export default Room
