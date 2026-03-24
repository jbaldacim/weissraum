import Container from "../components/Layout/Container";
import Grid, { Col } from "../components/Layout/Grid";
import Stack from "../components/Layout/Stack";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import FloatingLabelField from "../components/Form/FloatingLabelField";
import FloatingLabelCombobox from "../components/Form/FloatingLabelCombobox";
import FloatingLabelTextArea from "../components/Form/FloatingLabelTextArea";
import { Heading } from "../components/Typography/Text";

const categories = ["Self-worth", "Family", "Relationship", "Work"];

function NewEntry() {
  return (
    <Container>
      <Stack>
        <SectionHeader label="New Entry" heading="Record a new thought" />
        <Grid>
          <Col>
            <Heading>The Assumption</Heading>
          </Col>
          <Col $span={8}>
            <FloatingLabelField label="Tested assumption" id="assumption" />
          </Col>
          <Col $span={4}>
            <FloatingLabelCombobox
              label="Categories"
              id="categories"
              categories={categories}
            />
          </Col>
          <Col>
            <Heading>The Experiment</Heading>
          </Col>
          <Col $span={6}>
            <FloatingLabelTextArea label="Experiment" id="experiment" />
          </Col>
          <Col $span={6}>
            <FloatingLabelTextArea label="Predictions" id="predictions" />
          </Col>
          <Col $span={6}>
            <FloatingLabelTextArea
              label="Possible problems"
              id="possible-problems"
            />
          </Col>
          <Col $span={6}>
            <FloatingLabelTextArea label="Strategies" id="strategies" />
          </Col>
          <Col>
            <Heading>The Results</Heading>
          </Col>
          <Col $span={6}>
            <FloatingLabelTextArea label="What happened" id="what-happened" />
          </Col>
          <Col $span={6}>
            <FloatingLabelTextArea
              label="Did results match predictions?"
              id="results-vs-predictions"
            />
          </Col>
          <Col $span={6}>
            <FloatingLabelTextArea
              label="Anything unexpected?"
              id="unexpected"
            />
          </Col>
          <Col $span={6}>
            <FloatingLabelTextArea label="How you coped" id="how-coped" />
          </Col>
          <Col>
            <Heading>The Conclusion</Heading>
          </Col>
          <Col>
            <FloatingLabelTextArea
              label="Alternative assumption"
              id="alternative-assumption"
            />
          </Col>
        </Grid>
      </Stack>
    </Container>
  );
}

export default NewEntry;
