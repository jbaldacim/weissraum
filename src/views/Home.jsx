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
import { getEntries } from "../api/entries";
import { useEffect, useState } from "react";

const LastCell = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

function Home() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = (await getEntries()) || [];
      setEntries(res);
    }
    fetchData();
  }, []);

  const action = (
    <PrimaryButton onClick={() =>       navigate("/entries/new", { viewTransition: true })}>
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
          {entries.slice(0, 3).map((entry) => (
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
            <Link to="/archive" viewTransition>Archive →</Link>
          </LastCell>
        </Grid>
      </Stack>
    </Container>
  );
}

export default Home;
