import AssumptionCard from "../components/Card/AssumptionCard";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Container from "../components/Layout/Container";
import Stack from "../components/Layout/Stack";
import Grid, { Col } from "../components/Layout/Grid";
import { PrimaryButton } from "../components/Button/Button";
import { Caption, Display, Label } from "../components/Typography/Text";
import styled from "styled-components";
import Link from "../components/Link/Link";
import { useNavigate } from "react-router-dom";

const mockEntries = [
  {
    id: "1",
    assumption: "If I make a mistake, I will be rejected",
    category: "Self-worth",
    status: "new",
    date: "12 Mar 2026",
  },
  {
    id: "2",
    assumption: "I must always be in control or something bad will happen",
    category: "Control",
    status: "resolved",
    date: "10 Mar 2026",
  },
  {
    id: "3",
    assumption: "If I am vulnerable, people will take advantage of me",
    category: "Relationships",
    status: "new",
    date: "08 Mar 2026",
  },
];

const LastCell = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

function Home() {
  const navigate = useNavigate();

  const action = (
    <PrimaryButton onClick={() => navigate("/entries/new")}>
      Record a new thought
    </PrimaryButton>
  );

  return (
    <Container>
      <Stack $gap="var(--space-xl)">
        <SectionHeader
          label="Good to see you, João"
          heading="How are you thinking today?"
          lead="A quiet space to examine what you believe, and gently question it."
          action={action}
        />
        <Grid>
          <Col $span={6}>
            <Display>20</Display>
            <Caption>Assumptions registered</Caption>
          </Col>
          <Col $span={6}>
            <Display>35%</Display>
            <Caption>Resolved</Caption>
          </Col>
        </Grid>

        <SectionHeader
          label="Your recent entries"
          heading="What's been on your mind lately"
        />

        <Grid>
          {mockEntries.map((entry) => (
            <Col $span={6} key={entry.id}>
              <AssumptionCard
                id={entry.id}
                assumption={entry.assumption}
                category={entry.category}
                status={entry.status}
                date={entry.date}
              />
            </Col>
          ))}
          <LastCell $span={6}>
            <Label>View all</Label>
            <Link to="/archive">Archive →</Link>
          </LastCell>
        </Grid>
      </Stack>
    </Container>
  );
}

export default Home;
