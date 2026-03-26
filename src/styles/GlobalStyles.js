import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  /*
    The reset part is based on Josh Comeau's Custom CSS Reset
    https://www.joshwcomeau.com/css/custom-css-reset/
  */

  :root {
    /* Colors */
    --color-background:  ${({ theme }) => theme.colors.background};
    --color-surface:     ${({ theme }) => theme.colors.surface};
    --color-text:        ${({ theme }) => theme.colors.text};
    --color-muted:       ${({ theme }) => theme.colors.muted};
    --color-accent:      ${({ theme }) => theme.colors.accent};
    --color-accent-soft: ${({ theme }) => theme.colors.accentSoft};

    /* Fonts */
    --font-sans: ${({ theme }) => theme.fonts.sans};
    --font-mono: ${({ theme }) => theme.fonts.mono};

    /* Font sizes */
    --size-xs:  ${({ theme }) => theme.fontSizes.xs};
    --size-sm:  ${({ theme }) => theme.fontSizes.sm};
    --size-md:  ${({ theme }) => theme.fontSizes.md};
    --size-lg:  ${({ theme }) => theme.fontSizes.lg};
    --size-xl:  ${({ theme }) => theme.fontSizes.xl};
    --size-xxl: ${({ theme }) => theme.fontSizes.xxl};

    /* Font weights */
    --weight-light:   ${({ theme }) => theme.fontWeights.light};
    --weight-regular: ${({ theme }) => theme.fontWeights.regular};
    --weight-medium:  ${({ theme }) => theme.fontWeights.medium};

    /* Letter spacing */
    --tracking-tight:  ${({ theme }) => theme.letterSpacing.tight};
    --tracking-normal: ${({ theme }) => theme.letterSpacing.normal};
    --tracking-wide:   ${({ theme }) => theme.letterSpacing.wide};
    --tracking-wider:  ${({ theme }) => theme.letterSpacing.wider};

    /* Line height */
    --leading-tight:  ${({ theme }) => theme.lineHeight.tight};
    --leading-normal: ${({ theme }) => theme.lineHeight.normal};
    --leading-loose:  ${({ theme }) => theme.lineHeight.loose};

    /* Spacing */
    --space-xs:  ${({ theme }) => theme.space.xs};
    --space-sm:  ${({ theme }) => theme.space.sm};
    --space-md:  ${({ theme }) => theme.space.md};
    --space-lg:  ${({ theme }) => theme.space.lg};
    --space-xl:  ${({ theme }) => theme.space.xl};
    --space-xxl: ${({ theme }) => theme.space.xxl};

    /* Borders */
    --border-thin:   ${({ theme }) => theme.borders.thin};
    --border-medium: ${({ theme }) => theme.borders.medium};

    /* Radii */
    --radius-none: ${({ theme }) => theme.radii.none};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  *:not(dialog) {
    margin: 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    html {
      interpolate-size: allow-keywords;
    }
  }

  body {
    background-color: var(--color-background);
    color:            var(--color-text);
    font-family:      var(--font-sans);
    font-weight:      var(--weight-regular);
    line-height:      var(--leading-normal);
    -webkit-font-smoothing: antialiased;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  p {
    text-wrap: pretty;
  }

  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }

  #root, #__next {
    isolation: isolate;
  }

  ::view-transition-group(*) {
    animation-duration: .5s;
  }
`;
