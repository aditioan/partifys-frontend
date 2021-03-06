import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import createStore from 'roles/host/createStore'
import Header from 'roles/host/components/Header'
import Party from 'roles/host/components/Party'
import Player from 'roles/host/components/Player'
import { ApiProvider } from 'roles/host/components/Party/providers/ApiProvider'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export default class Host extends Component {
  static propTypes = {
    party: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.store = createStore({
      initialState: {
        party: {
          name: this.props.party,
          code: this.props.code,
          accessToken: this.props.accessToken,
          isStarted: false
        }
      }
    })
  }

  render () {
    return (
      <Provider store={this.store}>
        <Wrapper>
          <ApiProvider party={this.props.party} code={this.props.code}>
            <Header />
            <Party />
            <Player />
          </ApiProvider>
        </Wrapper>
      </Provider>
    )
  }
}
