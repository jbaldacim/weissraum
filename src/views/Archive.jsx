import { useEffect, useState } from "react";
import AssumptionCard from "../components/Card/AssumptionCard";
import Container from "../components/Layout/Container";
import Grid, { Col } from "../components/Layout/Grid";
import Stack from "../components/Layout/Stack";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Select from "../components/Select/Select";
import { GhostButton } from "../components/Button/Button";
import { Caption } from "../components/Typography/Text";
import FloatingLabelField from "../components/Form/FloatingLabelField";
import { getEntries, getCategories } from "../api/entries";
import styled from "styled-components";

const ALL_CATEGORIES = "__all__";
const ALL_STATUSES = "__all__";
const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE = 300;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
`;

const PaginationRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

function Archive() {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [selectedStatus, setSelectedStatus] = useState(ALL_STATUSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const categoryId =
    selectedCategory === ALL_CATEGORIES ? null : selectedCategory;
  const statusFilter =
    selectedStatus === ALL_STATUSES ? null : selectedStatus;

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedSearch(searchQuery),
      SEARCH_DEBOUNCE,
    );
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchEntries() {
      const data = await getEntries(
        categoryId,
        statusFilter,
        debouncedSearch || null,
        page,
        PAGE_SIZE,
      );
      setEntries(data.entries);
      setTotal(data.total);
    }
    fetchEntries();
  }, [categoryId, statusFilter, debouncedSearch, page]);

  function handleCategoryChange(value) {
    setSelectedCategory(value);
    setPage(1);
  }

  function handleStatusChange(value) {
    setSelectedStatus(value);
    setPage(1);
  }

  function handleSearchChange(value) {
    setSearchQuery(value);
    setPage(1);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const categoryOptions = [
    { label: "All categories", value: ALL_CATEGORIES },
    ...categories.map((cat) => ({ label: cat.name, value: cat.id.toString() })),
  ];

  const statusOptions = [
    { label: "All statuses", value: ALL_STATUSES },
    { label: "Resolved", value: "resolved" },
    { label: "Unresolved", value: "unresolved" },
  ];

  return (
    <Container>
      <Stack>
        <SectionHeader label="Archive" heading="Your thoughts" />
        <FilterRow>
          <Select
            label="Filter by category"
            value={selectedCategory}
            onValueChange={handleCategoryChange}
            options={categoryOptions}
            placeholder="All categories"
          />
          <Select
            label="Filter by status"
            value={selectedStatus}
            onValueChange={handleStatusChange}
            options={statusOptions}
            placeholder="All statuses"
          />
        </FilterRow>
        <FloatingLabelField
          label="Text search"
          id="search"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
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