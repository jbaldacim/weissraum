import AssumptionCard from "../components/Card/AssumptionCard";
import Container from "../components/Layout/Container";
import Grid, { Col } from "../components/Layout/Grid";
import Stack from "../components/Layout/Stack";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import { getEntries } from "../data/entries";

function Archive() {
  return (
    <Container>
      <Stack>
        <SectionHeader label="Archive" heading="Your thoughts" />
        <Grid>
          {getEntries().map((entry) => (
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
