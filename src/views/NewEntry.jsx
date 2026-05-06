import { useEffect, useState } from "react";
import { getCategories, saveEntry } from "../api/entries";
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
import { createEntry } from "../domain/entry";
import { useNavigate } from "react-router-dom";

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: var(--space-sm);
`;

const initialForm = createEntry({});

function NewEntry() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();

      setCategories(data.map((cat) => cat.name));
    }
    fetchCategories();
  }, []);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleDiscard() {
    setForm(initialForm);
  }

  async function handleSave() {
    try {
      const newEntry = await saveEntry({
        assumption: form.assumption,
        category: form.category,
        experiment: form.experiment,
        predictions: form.predictions,
        possibleProblems: form.possibleProblems,
        strategies: form.strategies,
        whatHappened: form.whatHappened,
        resultsVsPredictions: form.resultsVsPredictions,
        unexpectedOutcomes: form.unexpectedOutcomes,
        copingStrategies: form.copingStrategies,
        alternativeAssumption: form.alternativeAssumption,
      });

      navigate(`/entries/${newEntry.id}`);
    } catch (error) {
      console.error("Save failed.", error);
      alert("Failed to save entry. Check console for details.");
    }
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
