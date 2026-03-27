import styled from "styled-components";
import Stack from "./Stack";
import Grid from "./Grid";
import { Heading } from "../Typography/Text";

const EntrySection = ({ title, children }) => {
  return (
    <Stack $gap="var(--space-md)">
      <Heading>{title}</Heading>
      <Grid>{children}</Grid>
    </Stack>
  );
};

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: flex-start;
  gap: var(--space-md);
`;

const DateBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: var(--space-sm);
`;

export { EntrySection, HeaderBlock, MetaRow, DateBlock, ButtonRow };
