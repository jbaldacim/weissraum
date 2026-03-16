import styled from "styled-components";
import Stack from "../Layout/Stack";
import { Heading, Label, Lead } from "../Typography/Text";

const Wrapper = styled.div`
  max-width: 48rem;
`;

function SectionHeader({ label, heading, lead }) {
  return (
    <Wrapper>
      <Stack $gap="var(--space-xs)">
        {label && <Label>{label}</Label>}
        <Heading>{heading}</Heading>
        {lead && <Lead>{lead}</Lead>}
      </Stack>
    </Wrapper>
  );
}

export default SectionHeader;
