import React from 'react'
import { StyledButton } from './styles'

/**
 *
 * @param {object} props
 * @param {'primary' | 'confirm' | 'danger' | 'neutral'} [props.variant='primary'] - A variante de estilo do botão.
 */
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  ...rest
}) => {
  return (
    <StyledButton
      onClick={onClick}
      $variant={variant}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}
