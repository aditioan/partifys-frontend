import React, { useState } from 'react'
import axios from 'axios'
import TrackItem from './TrackItem'

const Search = ({ room, token, addToPlaylist }) => {
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
      searchItem(room)
      setKeyword('')
    }
  }

  const previousPage = async () => {
    if (pagination.previous !== null) {
      const previous_url = encodeURIComponent(pagination.previous)
      const res = await axios.get(
        `http://localhost:3001/search/previous_page?room=${room}&previous=${previous_url}`
      )
      //console.log(res)
      setTracks(res.data)
      setPagination({
        previous: res.data.previous,
        next: res.data.next,
      })
    }
  }

  const nextPage = async () => {
    if (pagination.next !== null) {
      const next_url = encodeURIComponent(pagination.next)
      const res = await axios.get(
        `http://localhost:3001/search/next_page?room=${room}&next=${next_url}`
      )

      setTracks(res.data)
      setPagination({
        previous: res.data.previous,
        next: res.data.next,
      })
    }
  }

  const searchItem = async (room) => {
    const res = await axios.get(
      `http://localhost:3001/search?room=${room}&keyword=${keyword}`
    )

    setTracks(res.data)
    setPagination({
      previous: res.data.previous,
      next: res.data.next,
    })
  }
  return (
    <div className="center-align">
      <h3>The Search Component</h3>
      <form onSubmit={onSubmit}>
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
          className="btn"
          style={{ width: 200, margin: 10 }}
        />
      </form>

      <button
        onClick={previousPage}
        className="btn grey"
        style={{ width: 200, margin: 10 }}
      >
        Previous Page
      </button>
      <button
        onClick={nextPage}
        className="btn grey"
        style={{ width: 200, margin: 10 }}
      >
        Next Page
      </button>

      {JSON.stringify(tracks) !== '{}' && tracks.items.length > 0 && (
        <ul className="collection left-align">
          {tracks.items.map((item) => (
            <TrackItem
              key={item.id}
              track={item}
              token={token}
              addToPlaylist={addToPlaylist}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search
