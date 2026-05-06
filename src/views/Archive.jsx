import { useEffect, useState } from "react";
import AssumptionCard from "../components/Card/AssumptionCard";
import Container from "../components/Layout/Container";
import Grid, { Col } from "../components/Layout/Grid";
import Stack from "../components/Layout/Stack";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Select from "../components/Select/Select";
import { getEntries, getCategories } from "../api/entries";

const ALL_CATEGORIES = "__all__";

function Archive() {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  useEffect(() => {
    async function fetchData() {
      const [entriesData, categoriesData] = await Promise.all([
        getEntries(),
        getCategories(),
      ]);
      setEntries(entriesData);
      setCategories(categoriesData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchFiltered() {
      const categoryId =
        selectedCategory === ALL_CATEGORIES ? null : selectedCategory;
      const data = await getEntries(categoryId);
      setEntries(data);
    }
    fetchFiltered();
  }, [selectedCategory]);

  const categoryOptions = [
    { label: "All categories", value: ALL_CATEGORIES },
    ...categories.map((cat) => ({ label: cat.name, value: cat.id.toString() })),
  ];

  return (
    <Container>
      <Stack>
        <SectionHeader label="Archive" heading="Your thoughts" />
        <div>
          <Select
            label="Filter by category"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            options={categoryOptions}
            placeholder="All categories"
          />
        </div>
        <Grid>
          {entries.map((entry) => (
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
