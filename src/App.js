import qs from 'querystring'
import React, { Component, Suspense, lazy } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import theme from 'layout-components/theme'

const getQueryParams = search => qs.parse(search.substr(1))

const HomeApp = lazy(() => import('roles/home/App'));
const HostApp = lazy(() => import('roles/host/App'));
const GuestApp = lazy(() => import('roles/guest/App'));
const OauthApp = lazy(() => import('roles/oauth/App'));

class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter className='App'>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='/home' component={HomeApp} />
            <Route path='/oauth/callback' component={OauthApp} />
            <Route
              path='/host'
              render={({ location }) => {
                const { party, accessToken, code } = getQueryParams(
                  location.search
                )

                return (
                  <HostApp
                    party={party}
                    code={code}
                    accessToken={accessToken}
                  />
                )
              }}
            />
            <Route
              path='/:party/:code'
              render={({ match, ...rest }) => {
                const { party, code } = match.params
                const props = { party, code }

                return <GuestApp {...props} />
              }}
            />
            <Redirect from='/' to='/home' />
          </Switch>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App