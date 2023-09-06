import React from 'react'
import styled from "styled-components"
import { ButtonStyle } from './Button'
import Link from 'next/link'

const StyledLink = styled(Link)`
${ButtonStyle}
`

const ButtonLink = (props) => {
  return (
    <StyledLink {...props} />
  )
}

export default ButtonLink