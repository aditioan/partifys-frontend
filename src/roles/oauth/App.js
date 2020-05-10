import React from 'react'
import PropTypes from 'prop-types'
import qs from 'querystring'
import SpotifyApiFactory from 'helpers/spotifyApi'
import { Redirect } from 'react-router-dom'
import { formatName } from 'helpers/formatName'

export default function App ({ history, location }) {
  const hash = location.hash.substr(1)
  const params = new window.URLSearchParams(hash)

  const accessToken = params.get('access_token')
  const API = SpotifyApiFactory({accessToken});

  async function getProfile(){
    const profile = await API.profile.getData();


    const hostParams = {
      party: formatName(profile.display_name),
      code: Math.floor(100000 + Math.random() * 900000),
      accessToken
    }

    return <Redirect to={`/host?${qs.stringify(hostParams)}`} />
  }

  getProfile();
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired
  }).isRequired
}