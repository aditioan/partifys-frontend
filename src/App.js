import React, { Component } from 'react'
import { ExternalLinkButton } from './layout-components/button'
import TextField from './layout-components/text-field'
import { formatName } from './layout-components/format-name'

import styles from './app.module.css'

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

import axios from 'axios'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//import redux store
import { Provider } from 'react-redux'
import store from './store'

import Room from './components/Room'

export default class App extends Component {
  state = {
    partyName: '',
    partyCode: '',
    joinCode: '',
  }

  get partyUrl() {
    return `/${this.state.partyName}/${this.state.partyCode}`
  }

  get spotifyOauthUrl() {
    const client_id = process.env.REACT_APP_CLIENT_ID
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI
    const scopes =
      'user-read-private user-read-email user-read-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private'

    const login_string =
      'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirect_uri)

    //Note:
    //if you don't want to show the confirm dialog page all the time
    //get rid of the "+&'show_dialog=true" part
    //console.log(process.env.REACT_APP_CLIENT_ID)
    //return `https://accounts.spotify.com/authorize?${qs.stringify(query)}`
    return login_string
  }

  onPartyNameChange = (partyName) =>
    this.setState({ partyName: formatName(partyName) })

  componentDidMount() {
    const params = new URLSearchParams(window.location.search)

    if (params.has('error')) {
      console.log('There was an error during the authentication')
    }

    if (params.has('code')) {
      axios
        .get(`http://localhost:3001/callback/?code=${params.get('code')}`)
        .then((res) => {
          const error = res.data.error
          if (error) {
            console.log(error)
          } else {
            const access_token = res.data.access_token
            const refresh_token = res.data.refresh_token

            axios
              .post('http://localhost:3001/room', {
                access_token,
                refresh_token,
              })
              .then((res) => {
                this.setState({
                  partyCode: res.data.roomNumber,
                })
              })
          }
        })
    }
  }

  onChange = (e) => {
    this.setState({
      joinCode: e.target.value,
    })
  }

  onCreateParty = async (e) => {
    e.preventDefault()
    const res = axios.get('http://localhost:3001/create_party')
    console.log(res.data)
  }

  onJoin = async (e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:3001/room/join', {
      room: this.state.joinCode,
    })

    if (res.data.error) {
      console.log(res.data.error)
    } else {
      this.setState({
        partyCode: res.data.roomNumber,
      })
    }
  }

  render() {
    if (this.state.partyCode !== '') {
      return (
        <Provider store={store}>
          <Room room={this.state.partyCode} />
        </Provider>
      )
    } else {
      //landing page
      return (
        <Provider store={store}>
          <div className={styles.app}>
            <div className={styles.home}>
              <h1 className={styles.titleApp}>Partifys</h1>

              <p className={styles.highlight}>
                A premium Spotify account is required to use Partifys
              </p>
              <form onSubmit={this.onJoin}>
                <input
                  type="text"
                  // name="partycode"
                  placeholder="Party code"
                  value={this.state.joinCode}
                  onChange={this.onChange}
                  style={{ margin: 10 }}
                  className="browser-default"
                />
                {/* <ExternalLinkButton variant="primary" type="submit">
                  Join a party
                </ExternalLinkButton> */}
                <button
                  type="submit"
                  name="join"
                  className="btn"
                  style={{ textTransform: 'none' }}
                >
                  Join a party
                </button>
              </form>
              <ExternalLinkButton
                variant="secondary"
                href={this.spotifyOauthUrl}
              >
                Create a party
              </ExternalLinkButton>
            </div>
          </div>
        </Provider>
      )
    }
  }
}
