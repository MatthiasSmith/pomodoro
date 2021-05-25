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
    --light-red-orange: #FA8686;
    --teal: #70F3F8;
    --violet: #D881F8;
    --light-blue: #D7E0FF;
    --dark-blue: #1E213F;
    --darker-blue: #161932;
    --light-gray: #EFF1FA;
    --focus-blue: #1e5ee6;
    --timer-animation-ring-blue: #363b6f; 

    --color-primary: var(--red-orange);
    --timer-gradient: linear-gradient(to bottom right, #0e112a, #2e335c);
    --timer-shadow: -3.125rem -3.125rem 6.25rem #262B5F, 3.125rem 3.125rem 6.25rem #121530;
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

  // shapes 
  .circle {
    border-radius: 50%;
    overflow: hidden;
  }

  // layout
  .flex-row {
    display: flex;
  }

  .flex-col {
    display: flex;
    flex-flow: column;
  }

  .flex-col-centered {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
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

  // animations
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes ripple {
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(1.75);
      opacity: 0;
    }
  }
`;

export default GlobalStyles;
