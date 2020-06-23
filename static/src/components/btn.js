import React from 'react'
import Link from './link'
import styled from 'styled-components'

let Button = styled.div`
  -webkit-appearance: unset !important;
  border-radius: 0.25rem;
  background: ${props => props.theme.primary};
  box-shadow: 0 .5rem 1.5rem rgba(22,28,45,.1);
  color: white;
  display: inline-block;
  padding: .8125rem 1.25rem;
  transition-duration: 0.25s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 1rem 2.5rem rgba(22,28,45,.1),0 .5rem 1rem -.75rem rgba(22,28,45,.1);
  }
`

export default ({to, children, ...props}) => (
  <Link to={to}>
    <Button {...props}>{children}</Button>
  </Link>
)
