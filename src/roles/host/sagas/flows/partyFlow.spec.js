import {
  call,
  fork,
  put,
  select,
  take,
  cancel,
  takeEvery
} from 'redux-saga/effects'
import { getParty } from 'roles/host/reducers'
import { cloneableGenerator, createMockTask } from '@redux-saga/testing-utils'
import {
  partyStatusCreationError,
  partyStatusWaitingForTracks,
  partyStatusWaitingToStart,
  START_PARTY,
  partyStatusStarted,
  PARTY_TOKEN_EXPIRED,
  partyStatusFinished
} from 'roles/host/actions/party'
import {
  ADD_TO_BATTLE,
  triggerVote,
  startProcessVote,
  START_PROCESS_VOTE
} from 'roles/host/actions/tracks'
import createCurrentParty from 'roles/host/sagas/tasks/createCurrentParty'
import partyFlow from './partyFlow'
import signalingFlow from 'roles/host/sagas/flows/signalingFlow'
import guestFlow from 'roles/host/sagas/flows/guestFlow'
import processVote from 'roles/host/sagas/tasks/processVote'

describe('partyFlow', () => {
  const socket = {}
  const gen = cloneableGenerator(partyFlow)(socket)

  it('Should call the server to create the current party', () => {
    expect(gen.next().value).toEqual(call(createCurrentParty, socket))
  })

  it('Should handle creation error', () => {
    const clone = gen.clone()
    const next = clone.throw(new Error('Could not created party'))

    expect(next.value).toEqual(put(partyStatusCreationError()))
  })

  it('Should continue when party was successfuly created', () => {
    const clone = gen.clone()
    const signalingTask = createMockTask()
    const guestTask = createMockTask()
    expect(clone.next().value).toEqual(fork(signalingFlow, socket))

    expect(clone.next(signalingTask).value).toEqual(
      put(partyStatusWaitingForTracks())
    )

    expect(clone.next().value).toEqual(fork(guestFlow))

    expect(clone.next(guestTask).value).toEqual(take(ADD_TO_BATTLE))
    expect(clone.next().value).toEqual(take(ADD_TO_BATTLE))

    expect(clone.next().value).toEqual(put(partyStatusWaitingToStart()))
    expect(clone.next().value).toEqual(take(START_PARTY))
    expect(clone.next().value).toEqual(
      takeEvery(START_PROCESS_VOTE, processVote)
    )
    expect(clone.next().value).toEqual(put(startProcessVote()))
    expect(clone.next().value).toEqual(put(partyStatusStarted()))

    expect(clone.next().value).toEqual(take(PARTY_TOKEN_EXPIRED))
    expect(clone.next().value).toEqual(cancel(signalingTask))
    expect(clone.next().value).toEqual(cancel(guestTask))
    expect(clone.next().value).toEqual(put(partyStatusFinished()))
  })
})
