import styled from "styled-components";

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "var(--space-md)"};
  align-items: ${({ $align }) => $align || "stretch"};
`;

export default Stack;
