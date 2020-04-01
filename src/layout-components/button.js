import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const typeThemes = {
    primary: css`
        background: #07D44F;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
        text-decoration: none;
        color: #FFFFFF;
        border-color: #1e7e34;

        &:hover {
            background-color: #06c94a;
            border-color: #1e7e34;
        }
    `,
    secondary: css`
        background: #07EE59;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
        text-decoration: none;
        color: #FFFFFF;
        border-color: #1e7e34;
        
        &:hover {
            background-color: #02e654;
            border-color: #1e7e34;
        }
    `,
    tertiary: css`
      color: ${({ theme }) => theme.colors.typography};
      text-decoration: underline;
    `
  }
  
  export const Button = styled.button`
    width: 350px;
    height: 45px;
    border-radius: 15px;
    font-size: 30px;
    margin-bottom: 15px;
    cursor: pointer;
    min-width: 150px;
  
    ${({ variant }) => typeThemes[variant]}
  `
  
  Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary'])
  }
  
  Button.defaultProps = {
    variant: 'tertiary'
  }
  
  export const LinkButton = Button.withComponent(Link)
  
  export const ExternalLinkButton = Button.withComponent('a')  