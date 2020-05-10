import { takeEvery } from 'redux-saga/effects'
import { ADD_TO_BATTLE } from 'roles/host/actions/tracks'
import notifyBattleUpdate from 'roles/host/sagas/tasks/notifyBattleUpdate'
import searchTracks from 'roles/host/sagas/tasks/guests/searchTracks'
import addTrack from 'roles/host/sagas/tasks/guests/addTrack'

export default function * guestFlow (spotify) {
  yield takeEvery('@guest/search', searchTracks)
  yield takeEvery('@guest/track/add', addTrack)
  yield takeEvery(ADD_TO_BATTLE, notifyBattleUpdate)
}