import styled, { css } from "styled-components";

const Base = css`
  font-family: var(--font-sans);
  font-size: var(--size-sm);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  line-height: 1;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: var(--space-md);
  border: none;
  border-radius: var(--radius-none);
  cursor: pointer;

  transition:
    background 180ms linear,
    color 180ms linear,
    border-color 180ms linear,
    opacity 180ms linear;

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled.button`
  ${Base}

  background: var(--color-accent);
  color: var(--color-background);

  &:hover:not(:disabled) {
    background: var(--color-text);
  }
`;

export const SecondaryButton = styled.button`
  ${Base}

  background: transparent;
  color: var(--color-accent);
  border: var(--border-thin) var(--color-accent);

  &:hover:not(:disabled) {
    background: var(--color-accent-soft);
  }
`;

export const GhostButton = styled.button`
  ${Base}

  background: transparent;
  color: var(--color-muted);

  &:hover:not(:disabled) {
    background: var(--color-surface);
    color: var(--color-text);
  }
`;

export const DestructiveButton = styled.button`
  ${Base}
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  border: ${({ theme }) => `${theme.borders.thin} ${theme.colors.muted}`};

  &:hover:not(:disabled) {
    color: #8b2020;
    border-color: #8b2020;
    background: #f7eeee;
  }
`;
