import styled from "styled-components";

const Link = styled.a`
  font-family: var(--font-sans);
  font-size: inherit;
  font-weight: var(--weight-medium);
  color: var(--color-accent);
  text-decoration: none;
  border-bottom: var(--border-thin) var(--color-accent-soft);

  transition:
    border-color 180ms linear,
    color 180ms linear;

  &:hover {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  &:visited {
    color: var(--color-muted);
  }
`;

export default Link;
