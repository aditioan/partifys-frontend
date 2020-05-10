import React from 'react'
import renderer from 'react-test-renderer'
import InputField from './InputField'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    dark: '#151515',
    danger: '#a63d40',
    primary: '#1db954',
    confirm: '#90a959',
    accent: '#6494aa',
    typography: '#373d3f',
    typographyLight: '#bcbcbc'
  }
}

describe('InputField', () => {
  it('Should render an empty text InputField by default', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <InputField
            className='test-textfield'
            label='My label'
            name='test'
            value=''
            placeholder='write something'
            onChange={jest.fn()}
          />
        </ThemeProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Should render an empty Textfield', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <InputField
            className='test-textfield'
            type='email'
            label='Email address'
            name='email'
            value=''
            placeholder='john.doe@company.com'
            onChange={jest.fn()}
          />
        </ThemeProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Should render a filled InputField', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <InputField
            className='test-textfield'
            type='email'
            label='Email address'
            name='email'
            value='jane.doe@company.com'
            placeholder='john.doe@company.com'
            onChange={jest.fn()}
          />
        </ThemeProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})