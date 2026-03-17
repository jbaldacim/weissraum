import AssumptionCard from "../components/Card/AssumptionCard";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Container from "../components/Layout/Container";
import FloatingLabelCombobox from "../components/Form/FloatingLabelCombobox";

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

function Home() {
  return (
    <Container>
      <SectionHeader
        label="Your entries"
        heading="Underlying Assumptions"
        lead="A record of the beliefs you are learning to examine"
      />
      <FloatingLabelCombobox
        label="Category"
        id="category"
        categories={["Self-worth", "Relationships", "Control"]}
      />
      <div>
        {mockEntries.map((entry) => (
          <AssumptionCard
            key={entry.id}
            id={entry.id}
            assumption={entry.assumption}
            category={entry.category}
            status={entry.status}
            date={entry.date}
          />
        ))}
      </div>
    </Container>
  );
}

export default Home;
