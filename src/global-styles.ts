import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --font-family-sans: 'Kumbh Sans', sans-serif;
    --font-family-serif: 'Roboto Slab', serif;
    --font-family-mono: 'Space Mono', monospace;
    --font-weight-normal: 400;
    --font-weight-bold: 700;

    // colors
    --red-orange: #F87070;
    --light-red-orange: #F87070;
    --teal: #70F3F8;
    --violet: #D881F8;
    --light-blue: #D7E0FF;
    --dark-blue: #1E213F;
    --darker-blue: #161932;
    --light-gray: #EFF1FA;

    --color-primary: var(--red-orange);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    color: var(--light-blue);
    font-family: var(--font-family-sans);
    font-size: 1rem;
    height: -webkit-fill-available;
  }

  body {
    background: var(--dark-blue);
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    text-rendering: optimizeLegibility;
  }

  #root {
    align-content: center;
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    width: 100%;
  }

  // layout
  .flex-row {
    display: flex;
  }

  .flex-column {
    display: flex;
    flex-flow: column;
  }

  .space-between {
    justify-content: space-between;
  }

  .justify-center {
    justify-content: center;
  }

  .align-center {
    align-items: center;
  }

  .flex-1 {
    flex: 1;
  }

  // utility
  .sr-only:not(:focus):not(:active) {
    clip: rect(0 0 0 0); 
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap; 
    width: 1px;
  }

  .focus-visible {
    &:focus {
      outline: 0;
    }
  
    &:focus-visible {
      outline: 5px auto Highlight;
      outline: 5px auto -webkit-focus-ring-color;
    }
  }
`;

export default GlobalStyles;
