import React, { Component } from 'react'
import qs from 'querystring'
import styled from 'styled-components'
import Card, { CardContent, CardActions } from 'layout-components/Card'
import TextField from 'layout-components/TextField'
import { ExternalLinkButton, LinkButton } from 'layout-components/Button'
import { formatPartyName } from 'helpers/partyName'
import styles from './app.module.css'

const Outer = styled.div`
  min-height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${Card} {
    background: none;
    box-shadow: none;
    width: 100%;
    max-width: 500px;
    margin: auto;
  }
`

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
    this.setState({ partyName: formatPartyName(partyName) })

  render () {
    return (
      <div className={styles.app}>
        <div className={styles.home}>
          <h1 className={styles.titleApp}>Partifys</h1>

          <p className={styles.highlight}>A premium Spotify account is required to use Partifys</p>

          <Outer>
            <Card>
              <CardContent>
                <TextField
                  label='Party name'
                  name='guestname'
                  variant='secondary'
                  value={this.state.partyName}
                  onChange={this.onPartyNameChange}
                />
                <TextField
                  label='Pass code'
                  name='guestcode'
                  variant='secondary'
                  value={this.state.partyCode}
                  onChange={partyCode => this.setState({ partyCode })}
                />
                <CardActions>
                  <LinkButton variant='default' to={this.partyUrl}>
                    Join a party
                  </LinkButton>
                  <ExternalLinkButton variant='primary' href={this.spotifyOauthUrl}>
                    Create a party
                  </ExternalLinkButton>
                </CardActions>
              </CardContent>
            </Card>
          </Outer>
        </div>
      </div>
    )
  }
}
