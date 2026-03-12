import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-md);
`;

export default Grid;

export const Col = styled.div`
  grid-column: span ${({ $span }) => $span || 12};

  @media (max-width: 48rem) {
    grid-column: span 12;
  }
`;
