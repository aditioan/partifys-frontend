import React, { Component } from 'react'
import styles from './text-field.module.css';
import PropTypes from 'prop-types'

export default class TextField extends Component  {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
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
      <input 
        type={this.props.type} 
        name={this.props.name}
        id={this.props.name}
        className={`${styles.inputLogin} ${styles.iconKey}`} 
        placeholder={this.props.placeholder} 
        value={this.props.value}
        onChange={e => this.props.onChange(e.target.value)}
        onFocus={() => this.setState({ isFocused: true })}
        onBlur={() => this.setState({ isFocused: false })}
      />
    )
  }
}