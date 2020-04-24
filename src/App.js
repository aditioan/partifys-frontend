import React, { Component } from 'react'
import { ExternalLinkButton } from './layout-components/button'
import TextField from './layout-components/text-field'
import { formatName } from './layout-components/format-name'

import styles from './app.module.css'

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
                  //access_token,
                  //refresh_token,
                  partyCode: res.data.roomNumber,
                  //playlistId: res.data.playlist_id,
                })
              })
          }
        })
    }
  }

  componentDidUpdate() {
    //init the materializecss javascript
    M.AutoInit()
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
          <div className="row">
            <div className="col s12 m4 offset-m4">
              <div
                className="card grey lighten-5"
                style={{ marginTop: 50, paddingTop: 10 }}
              >
                <h1 className="grey-text text-darken-4 center-align">
                  Partifys
                </h1>
                <div className="card-content">
                  <form onSubmit={this.onJoin}>
                    <div className="input-field">
                      <input
                        id="join_party"
                        type="text"
                        value={this.state.joinCode}
                        onChange={this.onChange}
                      />
                      <label htmlFor="join_party">Enter Your Party Code</label>
                    </div>

                    <button
                      className="btn waves-effect waves-light grey darken-4"
                      style={{ width: '100%' }}
                      type="submit"
                      name="join"
                    >
                      Join a party
                    </button>
                    <a
                      className="waves-effect waves-light btn grey darken-4"
                      style={{ width: '100%', marginTop: 20 }}
                      href={this.spotifyOauthUrl}
                    >
                      Create your own
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Provider>
      )
    }
  }
}
