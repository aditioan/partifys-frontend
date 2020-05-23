import React from 'react'
import styled from 'styled-components'
import { MdClear } from 'react-icons/md'
import Typography from 'layout-components/Typography'
import { LinkButton } from 'layout-components/Button'

const Outer = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #b44343;

  a {
    color: #fff;
    opacity: .65;
  }
`

const FailedIcon = styled(MdClear)`
  font-size: 256px;
  color: #fff;
  margin-bottom: 24px;
  opacity: .25;
`

export default function InvalidAccount () {
  return (
    <Outer>
      <FailedIcon />
      <Typography reverse variant='display1'>Oopsie!</Typography>
      <Typography reverse>
        It looks like this spotify account is not a premium account.
        Please use a spotify premium account to log in.
      </Typography>
      <LinkButton to='/home'>Take me back home</LinkButton>
    </Outer>
  )
}
