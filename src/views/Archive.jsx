import { useEffect, useState } from "react";
import AssumptionCard from "../components/Card/AssumptionCard";
import Container from "../components/Layout/Container";
import Grid, { Col } from "../components/Layout/Grid";
import Stack from "../components/Layout/Stack";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Select from "../components/Select/Select";
import { GhostButton } from "../components/Button/Button";
import { Caption } from "../components/Typography/Text";
import { getEntries, getCategories } from "../api/entries";
import styled from "styled-components";

const ALL_CATEGORIES = "__all__";
const PAGE_SIZE = 10;

const PaginationRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

function Archive() {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const categoryId =
    selectedCategory === ALL_CATEGORIES ? null : selectedCategory;

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    async function fetchEntries() {
      const data = await getEntries(categoryId, page, PAGE_SIZE);
      setEntries(data.entries);
      setTotal(data.total);
    }
    fetchEntries();
  }, [categoryId, page]);

  function handleCategoryChange(value) {
    setSelectedCategory(value);
    setPage(1);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

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
            onValueChange={handleCategoryChange}
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
        {totalPages > 1 && (
          <PaginationRow>
            <GhostButton
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Previous
            </GhostButton>
            <Caption>
              Page {page} of {totalPages}
            </Caption>
            <GhostButton
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </GhostButton>
          </PaginationRow>
        )}
      </Stack>
    </Container>
  );
}

export default Archive;
