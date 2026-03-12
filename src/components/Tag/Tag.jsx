import styled, { css } from "styled-components";

const Base = css`
  font-family: var(--font-sans);
  font-size: var(--size-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  line-height: 1;

  display: inline-flex;
  align-items: center;

  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-none);
  white-space: nowrap;
`;

export const CategoryTag = styled.span`
  ${Base}
  background: var(--color-surface);
  color: var(--color-muted);
`;

export const StatusTag = styled.span`
  ${Base}
  background: ${({ $resolved }) =>
    $resolved ? "#E6EDE8" : "var(--color-accent-soft)"};
  color: ${({ $resolved }) => ($resolved ? "#3D5C42" : "var(--color-accent)")};
`;
