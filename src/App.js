import React, { Component } from 'react';
import qs from 'querystring'
import { ExternalLinkButton } from './layout-components/button';
import TextField from './layout-components/text-field';
import { formatName } from './layout-components/format-name';
import styles from './app.module.css';

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
    console.log(process.env.REACT_APP_CLIENT_ID);
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
          
          <TextField type="text" name="partycode" placeholder="Party code" />
          <ExternalLinkButton variant='primary' href={`https://www.google.com/`}>
            Join a party
          </ExternalLinkButton>

          <ExternalLinkButton variant='secondary' href={this.spotifyOauthUrl}>
            Create a party
          </ExternalLinkButton>
        </div>
      </div>
    );
  }
}
