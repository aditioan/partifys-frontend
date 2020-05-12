import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getParty } from 'roles/host/reducers'
import FullscreenButton from './FullScreenButton'

const Outer = styled.header`
  position: relative;
  z-index: 1;
  text-align: center;

  background: #151515;
  color: #fff;
  padding: 12px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, .25);

  svg {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
`

function Header ({ party }) {
  return (
    <Outer>
      Welcome to <b>{party.name}</b> party! Share this party using code <b>{party.code}</b>

      <FullscreenButton />
    </Outer>
  )
}

Header.propTypes = {
  party: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  }).isRequired
}

export default connect(state => ({
  party: getParty(state)
}))(Header)
