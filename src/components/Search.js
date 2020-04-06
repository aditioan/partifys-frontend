import React, { useState } from 'react'
import axios from 'axios'
import TrackItem from './TrackItem'

const Search = ({ token }) => {
  const [keyword, setKeyword] = useState('')
  const [tracks, setTracks] = useState({})
  const [pagination, setPagination] = useState({
    previous: null,
    next: null,
  })

  const onChange = (e) => {
    setKeyword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (keyword !== '') {
      searchItem(token)
      setKeyword('')
    }
  }

  const previousPage = async () => {
    if (pagination.previous !== null) {
      const res = await axios.get(pagination.previous, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      console.log(res)
      setTracks(res.data.tracks)
      setPagination({
        previous: res.data.tracks.previous,
        next: res.data.tracks.next,
      })
    }
  }

  const nextPage = async () => {
    if (pagination.next !== null) {
      const res = await axios.get(pagination.next, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      console.log(res)
      setTracks(res.data.tracks)
      setPagination({
        previous: res.data.tracks.previous,
        next: res.data.tracks.next,
      })
    }
  }

  const searchItem = async (token) => {
    // let searchString = `https://api.spotify.com/v1/search?q=name:${keyword}&type=track,artist,album&limit=50`
    let searchString = `https://api.spotify.com/v1/search?q=name:${keyword}&type=track&limit=50`
    const res = await axios.get(searchString, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    console.log(res)
    setTracks(res.data.tracks)
    setPagination({
      previous: res.data.tracks.previous,
      next: res.data.tracks.next,
    })
  }
  return (
    <div className="container">
      <h3>The Search Component</h3>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Something..."
          value={keyword}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>

      <button onClick={previousPage} className="btn btn-dark">
        Previous Page
      </button>
      <button onClick={nextPage} className="btn btn-dark">
        Next Page
      </button>

      {JSON.stringify(tracks) !== '{}' && tracks.items.length > 0 && (
        <div style={tracksStyle}>
          {tracks.items.map((item) => (
            <TrackItem key={item.id} track={item} token={token} />
          ))}
        </div>
      )}
    </div>
  )
}

const tracksStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '1rem',
}

export default Search
