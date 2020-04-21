import { GET_TRACKS, ADD_TRACK } from './types'

export const getLogs = () => {
  return async (dispatch) => {}
}

export const addTrack = (room, playlistId, uri) => {
  return async (dispatch) => {}
}

const addTrackToPlaylist = (uri, playlistId) => {
  axios({
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
}

const addTrackToDatabase = (room, uri) => {}
