export const UPDATE_PLAYER_STATE = 'UPDATE_PLAYER_STATE'
export const PLAY_TRACK = 'PLAY_TRACK'
export const PAUSE_TRACK = 'PAUSE_TRACK'
export const RESUME_TRACK = 'RESUME_TRACK'

export const updatePlayerState = state => ({
  type: UPDATE_PLAYER_STATE,
  state
})

export const playTrack = track => ({
  type: PLAY_TRACK,
  track
})

export const resumeTrack = track => ({
  type: RESUME_TRACK,
  track
})

export const pauseTrack = () => ({
  type: PAUSE_TRACK
})
