import { useState } from "react";

import Container from "../components/Layout/Container";
import Grid, { Col } from "../components/Layout/Grid";
import Stack from "../components/Layout/Stack";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import FloatingLabelField from "../components/Form/FloatingLabelField";
import FloatingLabelCombobox from "../components/Form/FloatingLabelCombobox";
import FloatingLabelTextArea from "../components/Form/FloatingLabelTextArea";
import { Heading } from "../components/Typography/Text";
import { PrimaryButton, GhostButton } from "../components/Button/Button";

import styled from "styled-components";
import Divider from "../components/Divider/Divider";

const categories = ["Self-worth", "Family", "Relationship", "Work"];

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: var(--space-sm);
`;

const initialForm = {
  assumption: "",
  category: "",
  experiment: "",
  predictions: "",
  possibleProblems: "",
  strategies: "",
  whatHappened: "",
  resultsVsPredictions: "",
  unexpectedOutcomes: "",
  copingStrategies: "",
  alternativeAssumption: "",
};

function NewEntry() {
  const [form, setForm] = useState(initialForm);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleDiscard() {
    setForm(initialForm);
  }

  function handleSave() {
    console.log("Save new entry", form);
  }

  const hasChanges = JSON.stringify(form) !== JSON.stringify(initialForm);

  return (
    <Container>
      <Stack $gap="var(--space-lg)">
        <SectionHeader label="New Entry" heading="Record a new thought" />

        <Grid>
          <Col>
            <Heading>The Assumption</Heading>
          </Col>

          <Col $span={8}>
            <FloatingLabelField
              label="Tested assumption"
              id="assumption"
              value={form.assumption}
              onChange={(e) => updateField("assumption", e.target.value)}
            />
          </Col>

          <Col $span={4}>
            <FloatingLabelCombobox
              label="Categories"
              id="categories"
              categories={categories}
              value={form.category}
              onChange={(value) => updateField("category", value)}
            />
          </Col>
        </Grid>
        <Divider />
        <Grid>
          <Col>
            <Heading>The Experiment</Heading>
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Experiment"
              id="experiment"
              value={form.experiment}
              onChange={(e) => updateField("experiment", e.target.value)}
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Predictions"
              id="predictions"
              value={form.predictions}
              onChange={(e) => updateField("predictions", e.target.value)}
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Possible problems"
              id="possible-problems"
              value={form.possibleProblems}
              onChange={(e) => updateField("possibleProblems", e.target.value)}
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Strategies"
              id="strategies"
              value={form.strategies}
              onChange={(e) => updateField("strategies", e.target.value)}
            />
          </Col>

          <Col>
            <Heading>The Results</Heading>
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="What happened"
              id="what-happened"
              value={form.whatHappened}
              onChange={(e) => updateField("whatHappened", e.target.value)}
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Did results match predictions?"
              id="results-vs-predictions"
              value={form.resultsVsPredictions}
              onChange={(e) =>
                updateField("resultsVsPredictions", e.target.value)
              }
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Anything unexpected?"
              id="unexpected"
              value={form.unexpectedOutcomes}
              onChange={(e) =>
                updateField("unexpectedOutcomes", e.target.value)
              }
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="How you coped"
              id="how-coped"
              value={form.copingStrategies}
              onChange={(e) => updateField("copingStrategies", e.target.value)}
            />
          </Col>

          <Col>
            <Heading>The Conclusion</Heading>
          </Col>

          <Col>
            <FloatingLabelTextArea
              label="Alternative assumption"
              id="alternative-assumption"
              value={form.alternativeAssumption}
              onChange={(e) =>
                updateField("alternativeAssumption", e.target.value)
              }
            />
          </Col>
        </Grid>

        <ButtonRow>
          <PrimaryButton onClick={handleSave} disabled={!hasChanges}>
            Save entry
          </PrimaryButton>

          <GhostButton onClick={handleDiscard} disabled={!hasChanges}>
            Discard
          </GhostButton>
        </ButtonRow>
      </Stack>
    </Container>
  );
}

export default NewEntry;
