import { call } from 'redux-saga/effects'
import getSpotifyClient from './getSpotifyClient'

/**
 * Pauses a track on Spotify using the API
 * @param {String} playerId - The id of the player.
 */
export default function * pauseTrack (playerId) {
    console.log("pausing track")
    const client = yield call(getSpotifyClient)
    return yield call([client.player, client.player.pause], playerId)
}
