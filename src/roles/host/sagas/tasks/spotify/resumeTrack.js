import { call } from 'redux-saga/effects'
import getSpotifyClient from './getSpotifyClient'

/**
 * Plays a track on Spotify using the API
 * @param {String} trackId - The id of the track to play.
 * @param {String} playerId - The id of the player.
 */
export default function * resumeTrack (trackId, playerId) {
  console.log("Current track: " + trackId)
  const client = yield call(getSpotifyClient)
  return yield call([client.player, client.player.resume], trackId, playerId)
}
