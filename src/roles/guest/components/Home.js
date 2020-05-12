import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  withApi,
  STATUS_ERROR,
  STATUS_READY,
  STATUS_PARTY_OVER
} from 'roles/guest/components/providers/ApiProvider'
import LoadingScreen from 'roles/guest/components/LoadingScreen'
import SearchBar from 'roles/guest/components/SearchBar'
import Battle from 'roles/guest/components/Battle'
import UserModal from 'roles/guest/components/UserModal'
import InvalidPasscodeScreen from 'roles/guest/components/InvalidPasscodeScreen'
import PartyOverScreen from 'roles/guest/components/PartyOverScreen'

const Wrapper = styled.div`
  height: 100vh;
  background: #151515;

  display: flex;
  flex-direction: column;
`

class Home extends Component {
  static propTypes = {
    api: PropTypes.shape({
      status: PropTypes.string.isRequired,
      rename: PropTypes.func.isRequired
    }).isRequired
  }

  state = {
    showUserModal: false
  }

  _showUserModal = () => this.setState({ showUserModal: true })

  _hideUserModal = () => this.setState({ showUserModal: false })

  _saveUsername = username => {
    this._hideUserModal()
    this.props.api.rename(username)
  }

  render () {
    if (this.props.api.status === STATUS_ERROR) {
      return <InvalidPasscodeScreen />
    } else if (this.props.api.status === STATUS_PARTY_OVER) {
      return <PartyOverScreen />
    } else if (this.props.api.status !== STATUS_READY) {
      return <LoadingScreen />
    }

    return (
      <Wrapper>
        <SearchBar onProfileClick={this._showUserModal} />
        <Battle />

        {this.state.showUserModal &&
          <UserModal
            onDismiss={this._hideUserModal}
            onSave={this._saveUsername}
          />}
      </Wrapper>
    )
  }
}

export default withApi(Home)
