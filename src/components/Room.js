import React, { useEffect, useState } from 'react'
import Search from './Search'
import axios from 'axios'
import Playlist from './Playlist'
import io from 'socket.io-client'

let socket

const Room = ({ token, room, playlistId }) => {
  const [playlist, setPlaylist] = useState(null)
  const createPlaylist = async () => {
    const res = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    console.log(res.data.id)

    const playlist = await axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${res.data.id}/playlists`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: {
        name: 'my new playlist',
      },
    })

    console.log(playlist.data.id)
    getPlaylist(playlist.data.id)
    //setPlaylistId(playlist.data.id)
  }

  const getPlaylist = async (room) => {
    const res = await axios.get(
      `http://localhost:3001/room/tracks?room=${room}`
    )

    console.log(res.data)

    // const res = await axios({
    //   method: 'get',
    //   url: `https://api.spotify.com/v1/playlists/${id}`,
    //   headers: {
    //     Authorization: 'Bearer ' + token,
    //   },
    // })
    // console.log('playlist: ')
    // console.log(res.data)
    setPlaylist(res.data)
  }

  const addToPlaylist = async (uri) => {
    try {
      const res = await axios.post('http://localhost:3001/room/add_track', {
        room: room,
        uri: uri,
        votes: 0,
      })
      console.log(res.data.msg)
    } catch (err) {
      console.error(err.response.data.msg)
      return
    }

    await axios({
      method: 'post',
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: {
        uris: [uri],
      },
    })

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
      //setPlaylistId(playlistId)
      getPlaylist(room)
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [])

  const sentHostInfo = async () => {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3001/room_info',
      data: {
        room: room,
        token: token,
      },
    })

    console.log(res)
  }

  return (
    <div className="container">
      <h3>Party Room {room}</h3>
      {playlist === null ? (
        <h3>Loading playlist...</h3>
      ) : (
        <div>
          <h3>{playlist.name}</h3>
          <Playlist playlist={playlist} />
          <Search token={token} addToPlaylist={addToPlaylist} />
        </div>
      )}
    </div>
  )
}

export default Room
