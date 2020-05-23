import React from 'react'
import PropTypes from 'prop-types'
import qs from 'querystring'
import { Redirect } from 'react-router-dom'
import useAxios from 'axios-hooks'

export default function App ({ history, location }) {
  const hash = location.hash.substr(1)
  const params = new window.URLSearchParams(hash)

  const accessToken = params.get('access_token')
  const party = qs.parse(params.get('state'))
  

  const hostParams = {
    party: party.party,
    code: party.code,
    accessToken
  }

  const [{ data, loading, error }] = useAxios(
    {
      url: `https://api.spotify.com/v1/me`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  if(data.product === "premium"){
    console.log("success")
    return <Redirect to={`/host?${qs.stringify(hostParams)}`} />
  } else {
    console.log("failed");
    return <Redirect to={`/invalidAccount`} />
  }
  
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired
  }).isRequired
}
