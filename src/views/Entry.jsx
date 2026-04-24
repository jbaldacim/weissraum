import { useMemo, useState } from "react";
import { useParams, useViewTransitionState } from "react-router-dom";

import Container from "../components/Layout/Container";
import Grid, { Col } from "../components/Layout/Grid";
import Stack from "../components/Layout/Stack";
import {
  EntrySection,
  HeaderBlock,
  MetaRow,
  DateBlock,
  ButtonRow,
} from "../components/Layout/EntryComponents";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Divider from "../components/Divider/Divider";
import FloatingLabelField from "../components/Form/FloatingLabelField";
import FloatingLabelTextArea from "../components/Form/FloatingLabelTextArea";
import { Heading, Caption, Label } from "../components/Typography/Text";
import { CategoryTag, StatusTag } from "../components/Tag/Tag";
import { Tags } from "../components/Card/AssumptionCard";
import { PrimaryButton, GhostButton } from "../components/Button/Button";
import BackButton from "../components/Nav/BackButton";

const mockEntries = [
  {
    id: "1",
    assumption: "If I make a mistake, I will be rejected",
    category: "Self-worth",
    status: "new",
    date: "12 Mar 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "2",
    assumption: "I must always be in control or something bad will happen",
    category: "Control",
    status: "resolved",
    date: "10 Mar 2026",
    experiment: "Let one small plan unfold without over-checking it.",
    predictions: "Something will go wrong and I will regret it.",
    possibleProblems: "I may feel anxious if I do not monitor everything.",
    strategies: "Pause before reacting. Write down what actually happened.",
    whatHappened:
      "It felt uncomfortable at first, but nothing serious happened.",
    resultsVsPredictions:
      "The outcome was much less catastrophic than I expected.",
    unexpectedOutcomes: "I felt some relief from not carrying everything.",
    copingStrategies:
      "Breathing, slowing down, and delaying my first reaction.",
    alternativeAssumption:
      "I can tolerate uncertainty without everything falling apart.",
  },
  {
    id: "3",
    assumption: "If I am vulnerable, people will take advantage of me",
    category: "Relationships",
    status: "new",
    date: "08 Mar 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "4",
    assumption: "If I say no, people will stop liking me",
    category: "Relationships",
    status: "new",
    date: "07 Mar 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "5",
    assumption: "I need to be productive all the time to be valuable",
    category: "Self-worth",
    status: "resolved",
    date: "05 Mar 2026",
    experiment: "Take one evening off without doing any productive task.",
    predictions: "I will feel guilty and fall behind.",
    possibleProblems: "Strong urge to check tasks or study.",
    strategies: "Plan rest intentionally and avoid task lists that evening.",
    whatHappened:
      "I felt guilty at first, but later felt more rested and focused.",
    resultsVsPredictions:
      "The guilt faded and I did not fall behind as expected.",
    unexpectedOutcomes:
      "I had more energy the next day and worked more efficiently.",
    copingStrategies: "Self-talk and reminding myself rest is necessary.",
    alternativeAssumption:
      "Rest supports productivity instead of reducing my value.",
  },
  {
    id: "6",
    assumption: "If things are uncertain, it means something is wrong",
    category: "Control",
    status: "new",
    date: "03 Mar 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "7",
    assumption: "If someone is upset, it is probably my fault",
    category: "Relationships",
    status: "new",
    date: "01 Mar 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "8",
    assumption: "Resting means I am being lazy",
    category: "Self-worth",
    status: "resolved",
    date: "27 Feb 2026",
    experiment: "Schedule a full rest day with no obligations.",
    predictions: "I will feel useless and waste time.",
    possibleProblems: "Feeling restless or trying to justify working.",
    strategies: "Define rest activities beforehand (reading, walking).",
    whatHappened:
      "I initially felt uneasy, but gradually relaxed and enjoyed the day.",
    resultsVsPredictions:
      "I did not feel useless; instead I felt mentally refreshed.",
    unexpectedOutcomes: "I returned to work with more clarity and less stress.",
    copingStrategies: "Accepting discomfort and reframing rest as recovery.",
    alternativeAssumption:
      "Rest is a valid and necessary part of being effective.",
  },
  {
    id: "9",
    assumption: "If I don’t understand something quickly, I am not capable",
    category: "Self-worth",
    status: "new",
    date: "25 Feb 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "10",
    assumption: "I need to please everyone to avoid conflict",
    category: "Relationships",
    status: "resolved",
    date: "22 Feb 2026",
    experiment: "Express a mild disagreement in a conversation.",
    predictions: "The other person will react negatively or reject me.",
    possibleProblems: "Fear of confrontation and overthinking afterward.",
    strategies: "Stay calm and focus on expressing my perspective clearly.",
    whatHappened: "The conversation remained respectful and nothing escalated.",
    resultsVsPredictions: "The reaction was neutral, not negative as expected.",
    unexpectedOutcomes: "I felt more confident after expressing my opinion.",
    copingStrategies: "Grounding myself and avoiding overanalysis afterward.",
    alternativeAssumption:
      "I can disagree respectfully without damaging relationships.",
  },
];

function Entry() {
  const { id } = useParams();

  const initialEntry = useMemo(
    () => mockEntries.find((entry) => entry.id == id) ?? null,
    [id],
  );

  const entryPath = `/entries/${id}`;
  const isTransitioning = useViewTransitionState(entryPath);

  const [savedEntry, setSavedEntry] = useState(initialEntry);
  const [draft, setDraft] = useState(initialEntry);

  if (!savedEntry || !draft) {
    return (
      <Container>
        <BackButton />
        <Heading>Entry not found.</Heading>
      </Container>
    );
  }

  function updateField(field, value) {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSave() {
    setSavedEntry(draft);
  }

  function handleDiscard() {
    setDraft(savedEntry);
  }

  const hasChanges = JSON.stringify(draft) !== JSON.stringify(savedEntry);

  return (
    <Container>
      <BackButton />
      <Stack $gap="var(--space-lg)">
        <HeaderBlock
          style={
            isTransitioning
              ? { viewTransitionName: `assumption-card-${id}` }
              : undefined
          }
        >
          <SectionHeader
            label="Entry"
            heading="Review and revise this thought"
            lead="Keep the whole entry editable, then save or discard your changes."
          />

          <MetaRow>
            <Tags>
              <CategoryTag>{savedEntry.category}</CategoryTag>
              <StatusTag $resolved={savedEntry.status === "resolved"}>
                {savedEntry.status}
              </StatusTag>
            </Tags>

            <DateBlock>
              <Label as="span">Logged</Label>
              <Caption>{savedEntry.date}</Caption>
            </DateBlock>
          </MetaRow>
        </HeaderBlock>

        <Grid>
          <Col $span={8}>
            <FloatingLabelField
              label="Tested assumption"
              id="assumption"
              value={draft.assumption}
              onChange={(e) => updateField("assumption", e.target.value)}
            />
          </Col>
        </Grid>

        <ButtonRow>
          <PrimaryButton onClick={handleSave} disabled={!hasChanges}>
            Save changes
          </PrimaryButton>

          <GhostButton onClick={handleDiscard} disabled={!hasChanges}>
            Discard changes
          </GhostButton>
        </ButtonRow>

        <Divider />

        <EntrySection title="The Experiment">
          <Col $span={6}>
            <FloatingLabelTextArea
              label="Experiment"
              id="experiment"
              value={draft.experiment}
              onChange={(e) => updateField("experiment", e.target.value)}
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Predictions"
              id="predictions"
              value={draft.predictions}
              onChange={(e) => updateField("predictions", e.target.value)}
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Possible problems"
              id="possible-problems"
              value={draft.possibleProblems}
              onChange={(e) => updateField("possibleProblems", e.target.value)}
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Strategies"
              id="strategies"
              value={draft.strategies}
              onChange={(e) => updateField("strategies", e.target.value)}
            />
          </Col>
        </EntrySection>

        <Divider />

        <EntrySection title="The Results">
          <Col $span={6}>
            <FloatingLabelTextArea
              label="What happened"
              id="what-happened"
              value={draft.whatHappened}
              onChange={(e) => updateField("whatHappened", e.target.value)}
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Did results match predictions?"
              id="results-vs-predictions"
              value={draft.resultsVsPredictions}
              onChange={(e) =>
                updateField("resultsVsPredictions", e.target.value)
              }
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="Anything unexpected?"
              id="unexpected-outcomes"
              value={draft.unexpectedOutcomes}
              onChange={(e) =>
                updateField("unexpectedOutcomes", e.target.value)
              }
            />
          </Col>

          <Col $span={6}>
            <FloatingLabelTextArea
              label="How you coped"
              id="coping-strategies"
              value={draft.copingStrategies}
              onChange={(e) => updateField("copingStrategies", e.target.value)}
            />
          </Col>
        </EntrySection>

        <Divider />

        <EntrySection title="The Conclusion">
          <Col>
            <FloatingLabelTextArea
              label="Alternative assumption"
              id="alternative-assumption"
              value={draft.alternativeAssumption}
              onChange={(e) =>
                updateField("alternativeAssumption", e.target.value)
              }
            />
          </Col>
        </EntrySection>
      </Stack>
    </Container>
  );
}

export default Entry;
