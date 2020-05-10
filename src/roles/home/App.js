import React, { Component } from 'react'
import qs from 'querystring'
import { ExternalLinkButton, LinkButton } from 'layout-components/Button'
import TextField from 'layout-components/TextField'
import theme from 'layout-components/theme'
import styles from './app.module.css'
import { formatName } from 'helpers/formatName'

export default class App extends Component {
  state = {
    partyName: '',
    partyCode: ''
  }

  get partyUrl () {
    return `/${this.state.partyName}/${this.state.partyCode}`
  }

  get spotifyOauthUrl () {
    const query = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      response_type: 'token',
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      state: qs.stringify({
        party: this.state.partyName,
        code: this.state.partyCode
      }),
      scope: 'streaming user-read-email user-read-private'
    }
    return `https://accounts.spotify.com/authorize?${qs.stringify(query)}`
  }

  onPartyNameChange = partyName =>
    this.setState({ partyName: formatName(partyName) })

  render() { 
    return (
      <div className={styles.app}>
        <div className={styles.home}>
          <h1 className={styles.titleApp}>Partifys</h1>

          <p className={styles.highlight}>A premium Spotify account is required to use Partifys</p>
          <TextField type="text" name="partyname" value={this.state.partyName} onChange={this.onPartyNameChange} placeholder="Party name" />
          <TextField type="text" name="partycode" value={this.state.partyCode} onChange={partyCode => this.setState({ partyCode })} placeholder="Party code" />
          <LinkButton theme={theme} variant='primary' to={this.partyUrl}>
            Join a party
          </LinkButton>

          <ExternalLinkButton theme={theme} variant='secondary' href={this.spotifyOauthUrl}>
            Create a party
          </ExternalLinkButton>
        </div>
      </div>
    );
  }
}