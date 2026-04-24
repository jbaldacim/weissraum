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
    assumption: "If I say no, people will stop liking me",
    category: "Relationships",
    status: "new",
    date: "07 Mar 2026",
  },
  {
    id: "5",
    assumption: "I need to be productive all the time to be valuable",
    category: "Self-worth",
    status: "resolved",
    date: "05 Mar 2026",
  },
  {
    id: "6",
    assumption: "If things are uncertain, it means something is wrong",
    category: "Control",
    status: "new",
    date: "03 Mar 2026",
  },
  {
    id: "7",
    assumption: "If someone is upset, it is probably my fault",
    category: "Relationships",
    status: "new",
    date: "01 Mar 2026",
  },
  {
    id: "8",
    assumption: "Resting means I am being lazy",
    category: "Self-worth",
    status: "resolved",
    date: "27 Feb 2026",
  },
  {
    id: "9",
    assumption: "If I don’t understand something quickly, I am not capable",
    category: "Self-worth",
    status: "new",
    date: "25 Feb 2026",
  },
  {
    id: "10",
    assumption: "I need to please everyone to avoid conflict",
    category: "Relationships",
    status: "resolved",
    date: "22 Feb 2026",
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
