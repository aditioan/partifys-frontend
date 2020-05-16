import { eventChannel } from 'redux-saga'
import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects'
import { isPlayerAvailable, getPosition, getDuration, getCurrentTrack } from 'roles/host/reducers'
import {
  PLAY_TRACK,
  RESUME_TRACK,
  PAUSE_TRACK,
  UPDATE_PLAYER_STATE,
  updatePlayerState
} from 'roles/host/actions/player'
import injectPlaybackSdk from 'roles/host/sagas/tasks/spotify/injectPlaybackSdk'
import createSpotifyPlayer from 'roles/host/sagas/tasks/createSpotifyPlayer'
import playTrack from 'roles/host/sagas/tasks/spotify/playTrack'
import resumeTrack from 'roles/host/sagas/tasks/spotify/resumeTrack'
import pauseTrack from 'roles/host/sagas/tasks/spotify/pauseTrack'
import { startProcessVote } from 'roles/host/actions/tracks'

const delay = ms => new Promise(resolve => window.setTimeout(resolve, ms))

export function * watchPlayerProgress () {
  let readyForNextTrack = false
  let lastPosition = Number.MAX_VALUE

  while (true) {
    yield take(UPDATE_PLAYER_STATE)
    const hasPlayer = yield select(isPlayerAvailable)

    if (hasPlayer) {
      const { position, duration } = yield select(state => ({
        position: getPosition(state),
        duration: getDuration(state)
      }))

      if (position < lastPosition) {
        readyForNextTrack = false
      }

      lastPosition = position

      if (duration - position <= 2000 && !readyForNextTrack) {
        readyForNextTrack = true
        yield delay(1500)
        yield put(startProcessVote())
      }
    }
  }
}

export const getTrack = (state) => getCurrentTrack(state);

export function * playTrackToSpotify (player, action) {
  console.log(player._options.id)
  yield call(playTrack, action.track.uri, player._options.id)
}

export function * resumeSpotify (player, action) {
  let track = yield select(getTrack);
  console.log(track);
  yield call(resumeTrack, track.uri, player._options.id)
}

export function * pauseSpotify (player) {
  console.log("Pause spotify called")
  yield call(pauseTrack, player._options.id)
}

export function fetchPlayerState (player) {
  return eventChannel(emit => {
    const interval = window.setInterval(() => {
      player.getCurrentState().then(state => emit(updatePlayerState(state)))
    }, 500)

    return () => window.clearInterval(interval)
  })
}

export function * watchPlayerState (player) {
  const channel = yield call(fetchPlayerState, player)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

export default function * root () {
  const sdkReady = new Promise(resolve => {
    window.onSpotifyWebPlaybackSDKReady = resolve
  })

  yield call(injectPlaybackSdk)
  yield sdkReady
  const player = yield call(createSpotifyPlayer)

  console.log('Watching player state...')
  yield fork(watchPlayerState, player)
  yield fork(watchPlayerProgress)

  yield takeEvery(PLAY_TRACK, playTrackToSpotify, player)
  yield takeEvery(RESUME_TRACK, resumeSpotify, player)
  yield takeEvery(PAUSE_TRACK, pauseSpotify, player)

}
