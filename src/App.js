import React, { Component } from 'react'
import qs from 'querystring'
import { ExternalLinkButton } from './layout-components/button'
import TextField from './layout-components/text-field'
import { formatName } from './layout-components/format-name'
import styles from './app.module.css'

import Room from './components/Room'
import './App.css'

import axios from 'axios'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//import redux store
import { Provider } from 'react-redux'
import store from './store'

// const hash = window.location.hash
//   .substring(1)
//   .split('&')
//   .reduce(function (initial, item) {
//     if (item) {
//       const parts = item.split('=')
//       initial[parts[0]] = decodeURIComponent(parts[1])
//     }
//     return initial
//   }, {})
// window.location.hash = ''

export default class App extends Component {
  state = {
    partyName: '',
    partyCode: '',
    token: '',
    rtoken: '',
    joinCode: '',
    //host: true,
    playlistId: '',
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
    //const client_id = process.env.REACT_APP_CLIENT_ID
    const client_id = '132372e0dac54dbba8fcc9204e3d24ff'
    const scopes =
      'user-read-private user-read-email user-read-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private'
    //const redirect_uri = process.env.REACT_APP_REDIRECT_URI
    const redirect_uri = 'http://localhost:3000/callback/'

    const login_string =
      'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirect_uri) +
      '&show_dialog=true'
    //Note:
    //if you don't want to show the confirm dialog page all the time
    //get rid of the "+&'show_dialog=true" part
    //console.log(process.env.REACT_APP_CLIENT_ID)
    //return `https://accounts.spotify.com/authorize?${qs.stringify(query)}`
    return login_string
  }

  getHashParams() {
    var hashParams = {}
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    //console.log('harshParams')
    //console.log(hashParams)
    return hashParams
  }

  onPartyNameChange = (partyName) =>
    this.setState({ partyName: formatName(partyName) })

  componentDidMount() {
    // Set token
    // let _token = hash.access_token
    // console.log('token= ' + _token)
    // if (_token) {
    //   this.setState({
    //     token: _token,
    //   })
    // }

    //var params = this.getHashParams()
    const params = new URLSearchParams(window.location.search)

    if (params.has('error')) {
      console.log('There was an error during the authentication')
    }

    if (params.has('code')) {
      axios
        .get(`http://localhost:3001/callback/?code=${params.get('code')}`)
        .then((res) => {
          //console.log(res.data)
          const error = res.data.error
          if (error) {
            console.log(error)
          } else {
            const access_token = res.data.access_token
            const refresh_token = res.data.refresh_token

            axios
              .post('http://localhost:3001/room', {
                token: access_token,
              })
              .then((res) => {
                //console.log(res.data.roomNumber)

                this.setState({
                  token: access_token,
                  rtoken: refresh_token,
                  partyCode: res.data.roomNumber,
                  playlistId: res.data.playlist_id,
                })
              })
          }
        })
    }

    // var access_token = params.access_token
    // var refresh_token = params.refresh_token
    // var error = params.error

    // if (error) {
    //   console.log('There was an error during the authentication')
    // } else {
    //   if (access_token) {
    //     this.setState({
    //       token: access_token,
    //       rtoken: refresh_token,
    //     })
    //   }
    // }

    // if (access_token) {
    //   //console.log('I am here!!!!')
    //   axios
    //     .post('http://localhost:3001/room', {
    //       token: access_token,
    //     })
    //     .then((res) => {
    //       //console.log(res.data.roomNumber)
    //       this.setState({
    //         partyCode: res.data.roomNumber,
    //         playlistId: res.data.playlist_id,
    //       })
    //     })
    // }
  }

  get createRoom() {
    return axios.get('/room')
  }

  get roomNumber() {
    const s1 = Math.floor(Math.random() * 10).toString()
    const s2 = Math.floor(Math.random() * 10).toString()
    const s3 = Math.floor(Math.random() * 10).toString()
    const s4 = Math.floor(Math.random() * 10).toString()
    return s1.concat(s2, s3, s4)
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

  onJoin = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:3001/room/join', {
        room: this.state.joinCode,
      })
      .then((res) => {
        //console.log(res.data.roomNumber)
        if (res.data.token !== '' && res.data.roomNumber !== '') {
          console.log(res.data)
          this.setState({
            token: res.data.token,
            partyCode: res.data.roomNumber,
            playlistId: res.data.playlistId,
          })
        }
      })
  }

  render() {
    if (
      this.state.partyCode !== '' &&
      this.state.rtoken !== '' &&
      this.state.token !== '' &&
      this.state.playlistId !== ''
    ) {
      return (
        <Provider store={store}>
          <Room
            token={this.state.token}
            rtoekn={this.state.token}
            room={this.state.partyCode}
            playlistId={this.state.playlistId}
          />
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

              <TextField
                type="text"
                name="partycode"
                placeholder="Party code"
              />
              <ExternalLinkButton
                variant="primary"
                href={`https://www.google.com/`}
              >
                Join a party
              </ExternalLinkButton>

              <form onSubmit={this.onJoin} className="form">
                <input
                  type="text"
                  placeholder="party code"
                  value={this.state.joinCode}
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  value="Join a party"
                  className="btn btn-dark btn-block"
                />
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
