import AssumptionCard from "../components/Card/AssumptionCard";
import Container from "../components/Layout/Container";
import Grid, { Col } from "../components/Layout/Grid";
import Stack from "../components/Layout/Stack";
import SectionHeader from "../components/SectionHeader/SectionHeader";

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
  {
    id: "4",
    assumption: "If I make a mistake, I will be rejected",
    category: "Self-worth",
    status: "new",
    date: "12 Mar 2026",
  },
  {
    id: "5",
    assumption: "I must always be in control or something bad will happen",
    category: "Control",
    status: "resolved",
    date: "10 Mar 2026",
  },
  {
    id: "6",
    assumption: "If I am vulnerable, people will take advantage of me",
    category: "Relationships",
    status: "new",
    date: "08 Mar 2026",
  },
  {
    id: "7",
    assumption: "If I make a mistake, I will be rejected",
    category: "Self-worth",
    status: "new",
    date: "12 Mar 2026",
  },
  {
    id: "8",
    assumption: "I must always be in control or something bad will happen",
    category: "Control",
    status: "resolved",
    date: "10 Mar 2026",
  },
  {
    id: "9",
    assumption: "If I am vulnerable, people will take advantage of me",
    category: "Relationships",
    status: "new",
    date: "08 Mar 2026",
  },
];

function Archive() {
  return (
    <Container>
      <Stack>
        <SectionHeader label="Archive" heading="Your thoughts" />
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
        </Grid>
      </Stack>
    </Container>
  );
}

export default Archive;
