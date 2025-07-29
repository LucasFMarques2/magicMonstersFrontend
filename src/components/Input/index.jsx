import React from 'react'
import { StyledInput } from './styles'

export const Input = ({ type = 'text', ...rest }) => {
  return <StyledInput type={type} {...rest} />
}
