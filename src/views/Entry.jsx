import { useParams, useViewTransitionState } from "react-router-dom";
import Container from "../components/Layout/Container";
import Stack from "../components/Layout/Stack";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import { Heading } from "../components/Typography/Text";
import { CategoryTag, StatusTag } from "../components/Tag/Tag";
import { Tags } from "../components/Card/AssumptionCard";

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

function Entry() {
  const { id } = useParams();
  const entry = mockEntries.find((entry) => entry.id == id);
  const entryPath = `/entries/${id}`;
  const isTransitioning = useViewTransitionState(entryPath);

  return (
    <Container>
      <Stack>
        {entry ? (
          <div
            style={
              isTransitioning
                ? { viewTransitionName: `assumption-card-${id}` }
                : undefined
            }
          >
            <SectionHeader label="The assumption" heading={entry.assumption} />
            <Tags>
              <CategoryTag>{entry.category}</CategoryTag>
              <StatusTag $resolved={entry.status == "resolved"}>
                {entry.status}
              </StatusTag>
            </Tags>
          </div>
        ) : (
          <Heading>Entry not found.</Heading>
        )}
      </Stack>
    </Container>
  );
}

export default Entry;

const assumption = {
  assumption: "",
  category: "",
  logDate: new Date(),
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
