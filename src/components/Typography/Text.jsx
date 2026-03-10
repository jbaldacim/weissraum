import styled from "styled-components";

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 300;
  line-height: ${({ theme }) => theme.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
`;
