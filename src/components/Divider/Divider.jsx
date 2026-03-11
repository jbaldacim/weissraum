import styled from "styled-components";

const Divider = styled.hr`
  border: none;
  border-top: ${({ theme }) => `${theme.borders.thin} ${theme.colors.surface}`};
  width: 100%;
`;

export default Divider;
