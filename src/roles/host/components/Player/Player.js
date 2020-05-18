import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getArtistsAsHumanFormat } from 'helpers/tracks'
import Typography from 'layout-components/Typography'
import { Button } from 'layout-components/Button'
import * as actions from 'roles/host/actions/player'
import {
  getCurrentTrack,
  getCurrentAlbum,
  getCurrentArtists,
  getProgress,
  isPlaying
} from 'roles/host/reducers'
import { Container } from './components'
import { bindActionCreators } from 'redux'

const Outer = styled(Container)`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px;
  width: 100%;
`

const ControlButtons = styled(Container)`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Cover = styled.img`
  max-width: 75px;
  margin-right: 12px;
`

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: ${({ theme }) => theme.colors.primary};
  width: 0;
  transition: width .2s ease;
`

const PlayButton = connect(null, dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(({ actions }) => (
  <Button variant='primary' onClick={actions.resumeTrack}>
    Resume
  </Button>
))

const PauseButton = connect(null, dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(({ actions }) => (
  <Button variant='primary' onClick={actions.pauseTrack}>
    Pause
  </Button>
))

const SkipButton = connect(null, dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(({ actions }) => (
  <Button variant='primary' onClick={actions.skipTrack}>
    Skip
  </Button>
))

const PlayPauseButton = isPlaying ? <PauseButton /> : <PlayButton />

function Player ({ track, album, artists, progress }) {
  return (
    <div>
      <Outer>
        <Progress style={{ width: `${progress * 100}%` }} />
        <Cover src={album.cover} alt={`Album cover for "${album.name}"`} />
        <div>
          <Typography reverse>{track.name}</Typography>
          <Typography reverse type='secondary'>
            {getArtistsAsHumanFormat({ artists })}
          </Typography>
        </div>
      </Outer>
      <ControlButtons>
        <PlayButton />
        <PauseButton />
        <SkipButton />
      </ControlButtons>
      </div>
  )
}

Player.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired
  }).isRequired,
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  progress: PropTypes.number.isRequired
}

export default connect(state => ({
  track: getCurrentTrack(state),
  album: getCurrentAlbum(state),
  artists: getCurrentArtists(state),
  progress: getProgress(state)
}))(Player)
