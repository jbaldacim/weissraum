import styled from "styled-components";

export const Display = styled.h1`
  font-family: var(--font-sans);
  font-size: var(--size-xxl);
  font-weight: var(--weight-light);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
`;

export const Heading = styled.h2`
  font-family: var(--font-sans);
  font-size: var(--size-xl);
  font-weight: var(--weight-light);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
`;

export const Lead = styled.p`
  font-family: var(--font-sans);
  font-size: var(--size-lg);
  font-weight: var(--weight-light);
  line-height: var(--leading-loose);
  color: var(--color-text);
`;

export const Body = styled.p`
  font-family: var(--font-sans);
  font-size: var(--size-md);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  color: var(--color-text);
`;

export const Label = styled.span`
  font-family: var(--font-sans);
  font-size: var(--size-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-muted);
`;

export const Caption = styled.span`
  font-family: var(--font-sans);
  font-size: var(--size-xs);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  color: var(--color-muted);
`;

export const InputText = styled.span`
  font-family: var(--font-mono);
  font-size: var(--size-md);
  font-weight: var(--weight-regular);
  line-height: var(--leading-loose);
  color: var(--color-text);
`;
