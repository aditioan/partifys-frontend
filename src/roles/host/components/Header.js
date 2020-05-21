import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getParty } from 'roles/host/reducers'
import FullscreenButton from './FullScreenButton'
import QRCode from 'qrcode.react'

const Outer = styled.header`
  position: relative;
  z-index: 1;
  text-align: center;

  background: #151515;
  color: #fff;
  padding: 12px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.25);

  svg {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const Button = styled.button`
  background: transparent;
  color: #fff;
  font-size: 14px;
`

const Box = styled.header`
  position: relative;
  z-index: 2;
  width: 140px;
  height: 140px;
  margin: auto;
  background: #eee;
  color: #fff;
  padding: 12px;
`

function Header({ party }) {
  const [qr, setQr] = useState(false)

  return (
    <Outer>
      <p>
        Welcome to <b>{party.name}</b> party! Share this party using code{' '}
        <b>{party.code}</b> or click{' '}
        <Button onClick={() => setQr(!qr)}>{qr ? 'hide' : 'show'}</Button>{' '}
        <b> QR code </b>
      </p>
      <FullscreenButton />
      {qr && (
        <Box>
          <QRCode
            value={
              window.location.protocol +
              '//' +
              window.location.hostname +
              '/' +
              party.name +
              '/' +
              party.code
            }
          />
        </Box>
      )}
    </Outer>
  )
}

Header.propTypes = {
  party: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
}

export default connect((state) => ({
  party: getParty(state),
}))(Header)
