import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card, { CardContent, CardActions } from './Card'
import { Button } from './Button'

const Outer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .75);

  display: flex;
  align-items: center;
  justify-content: center;
`

export default class ErrorModal extends Component {
  static propTypes = {
    onDismiss: PropTypes.func.isRequired
  }

  render () {
    return (
      <Outer>
        <Card>
          <CardContent>
            <p>Make sure all inputs are not empty!</p>
          </CardContent>
          <CardActions>
            <Button variant='primary' onClick={this.props.onDismiss}>Cancel</Button>
          </CardActions>
        </Card>
      </Outer>
    )
  }
}
