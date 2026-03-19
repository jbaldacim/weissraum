import styled from "styled-components";
import Stack from "../Layout/Stack";
import { Heading, Label, Lead } from "../Typography/Text";

const Wrapper = styled.div`
  max-width: 48rem;
`;

const ActionWrapper = styled.div`
  display: inline-block;
`;

function SectionHeader({ label, heading, lead, action }) {
  return (
    <Wrapper>
      <Stack $gap="var(--space-xs)">
        {label && <Label>{label}</Label>}
        <Heading>{heading}</Heading>
        {lead && <Lead>{lead}</Lead>}
        {action && <ActionWrapper>{action}</ActionWrapper>}
      </Stack>
    </Wrapper>
  );
}

export default SectionHeader;
