import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #282c34;
    color: #ffffff;
     font-family: 'Press Start 2P', cursive;
  }

  a, button, p, span{
      font-family: 'Press Start 2P', cursive;
  }

  button {
    cursor: pointer;
  }
`
