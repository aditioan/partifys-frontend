import React, { Component } from 'react';
import qs from 'querystring'
import { ExternalLinkButton, LinkButton } from 'layout-components/Button';
import TextField from 'layout-components/TextField';
import theme from 'layout-components/theme'
import styles from './app.module.css';

export default class App extends Component {
  state = {
    partyCode: ''
  }

  get partyUrl () {
    return `/${this.state.partyCode}`
  }

  get spotifyOauthUrl () {
    const query = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      response_type: 'token',
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      scope: 'streaming user-read-email user-read-private'
    }
    return `https://accounts.spotify.com/authorize?${qs.stringify(query)}`
  }

  render() { 
    return (
      <div className={styles.app}>
        <div className={styles.home}>
          <h1 className={styles.titleApp}>Partifys</h1>

          <p className={styles.highlight}>A premium Spotify account is required to use Partifys</p>
          
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