import React from 'react'
import PropTypes from 'prop-types'
import qs from 'querystring'
import { Redirect } from 'react-router-dom'
import { formatName } from 'helpers/formatName'
import { v4 as uuid } from 'uuid'

export default function App ({ history, location }) {
  const hash = location.hash.substr(1)
  const params = new window.URLSearchParams(hash)

  const accessToken = params.get('access_token')

  const hostParams = {
    party: formatName(uuid()),
    code: Math.floor(100000 + Math.random() * 900000),
    accessToken
  }

  return <Redirect to={`/host?${qs.stringify(hostParams)}`} />

}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired
  }).isRequired
}