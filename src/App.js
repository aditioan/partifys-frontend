import React, { Component } from 'react'
import qs from 'querystring'
import { ExternalLinkButton } from './layout-components/button'
import TextField from './layout-components/text-field'
import { formatName } from './layout-components/format-name'
import styles from './app.module.css'

const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function(initial, item) {
    if (item) {
      const parts = item.split('=')
      initial[parts[0]] = decodeURIComponent(parts[1])
    }
    return initial
  }, {})
window.location.hash = ''

export default class App extends Component {
  state = {
    partyName: '',
    partyCode: '',
    token: ''
  }

  get partyUrl() {
    return `/${this.state.partyName}/${this.state.partyCode}`
  }

  get spotifyOauthUrl() {
    // const query = {
    //   client_id: process.env.REACT_APP_CLIENT_ID,
    //   response_type: 'token',
    //   redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    //   state: qs.stringify({
    //     party: this.state.partyName,
    //     code: this.state.partyCode
    //   }),
    //   scope: 'streaming user-read-email user-read-private'
    // }
    const client_id = process.env.REACT_APP_CLIENT_ID
    const scopes =
      'user-read-private user-read-email user-read-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private'
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI

    const login_string =
      'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' +
      client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirect_uri) +
      '&show_dialog=true'
    //Note:
    //if you don't want to show the confirm dialog page all the time
    //get rid of the "+&'show_dialog=true" part
    console.log(process.env.REACT_APP_CLIENT_ID)
    //return `https://accounts.spotify.com/authorize?${qs.stringify(query)}`
    return login_string
  }

  onPartyNameChange = partyName =>
    this.setState({ partyName: formatName(partyName) })

  componentDidMount() {
    // Set token
    let _token = hash.access_token
    console.log('token= ' + _token)
    if (_token) {
      this.setState({
        token: _token
      })
    }
  }

  render() {
    //landing page
    if (this.state.token === '') {
      return (
        <div className={styles.app}>
          <div className={styles.home}>
            <h1 className={styles.titleApp}>Partifys</h1>

            <p className={styles.highlight}>
              A premium Spotify account is required to use Partifys
            </p>

            <TextField type="text" name="partycode" placeholder="Party code" />
            <ExternalLinkButton
              variant="primary"
              href={`https://www.google.com/`}
            >
              Join a party
            </ExternalLinkButton>

            <ExternalLinkButton variant="secondary" href={this.spotifyOauthUrl}>
              Create a party
            </ExternalLinkButton>
          </div>
        </div>
      )
    } else {
      //after user login and become the room host
      return (
        <div>
          <div>In Room host mode</div>
          <p>The token is = </p>
          <p>{this.state.token}</p>
        </div>
      )
    }
  }
}
