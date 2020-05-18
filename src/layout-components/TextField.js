import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const typeThemes = {
  primary: css`
    color: #000;
  `,
  secondary: css`
    color: #fff;
  `,
}

const Wrapper = styled.div`
  display: block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`

const Inner = styled.div`
  position: relative;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ isFocused }) => (isFocused ? '#fff' : '#eee')};
  border-radius: 4px;
  transition: all .2s ease;
`

const Label = styled.label`
  position: absolute;
  transition: all .2s ease;
  font-weight: lighter;
  left: 8px;
  ${({ variant }) => typeThemes[variant]}

  ${({ isTop }) => (isTop ? `
    top: 0;
    transform: translateY(-50%);
    font-size: 0.9rem;
    background: #fff;
    padding: 0 12px;
    color: #000;
  ` : `
    top: 25%;
    font-size: inherit;
    background: transparent;
    padding: 0;
  `)}
`

Label.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary'])
}

Label.defaultProps = {
  variant: 'primary'
}

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  font-family: inherit;
  
  outline: none;
  padding: 0 8px;

  ${({ variant }) => typeThemes[variant]}
`

Input.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary'])
}

Input.defaultProps = {
  variant: 'primary'
}

export default class TextField extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    variant: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    type: 'text'
  }

  state = {
    isFocused: false
  }

  render () {
    return (
      <Wrapper className={this.props.className}>
        <Inner isFocused={this.state.isFocused}>
          <Label
            htmlFor={this.props.name}
            isTop={this.state.isFocused || this.props.value !== ''}
            variant={this.props.variant}
          >
            {this.props.label}
          </Label>
          <Input
            type={this.props.type}
            name={this.props.name}
            id={this.props.name}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={e => this.props.onChange(e.target.value)}
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
            variant={this.props.variant}
          />
        </Inner>
      </Wrapper>
    )
  }
}
