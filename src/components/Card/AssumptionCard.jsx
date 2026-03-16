import { Link, useViewTransitionState } from "react-router-dom";
import styled from "styled-components";
import { Body, Caption } from "../Typography/Text";
import { CategoryTag, StatusTag } from "../Tag/Tag";

const CardLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);

  padding: var(--space-sm) 0;
  border-top: var(--border-thin) var(--color-surface);
  cursor: pointer;
  text-decoration: none;

  transition: border-color 180ms linear;

  &:last-child {
    border-bottom: var(--border-thin) var(--color-surface);
  }

  &:hover {
    border-top-color: var(--color-muted);
  }
`;

const Assumption = styled(Body)`
  flex: 1;
  color: var(--color-text);
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-shrink: 0;
`;

const Separator = styled(Caption)`
  color: var(--color-surface);
`;

function AssumptionCard({ id, assumption, category, status, date }) {
  const entryPath = `/entries/${id}`;

  // useViewTransitionState returns true when the browser is actively
  // transitioning to this card's entry path. That means the
  // view-transition-name is applied only during the transition,
  // when it's actually needed, and not permanently, which would
  // cause naming conflicts.
  const isTransitioning = useViewTransitionState(entryPath);

  return (
    <CardLink
      to={entryPath}
      viewTransition
      style={
        isTransitioning
          ? { viewTransitionName: `assumption-card-${id}` }
          : undefined
      }
    >
      <Assumption>{assumption}</Assumption>
      <Meta>
        <CategoryTag>{category}</CategoryTag>
        <StatusTag $resolved={status === "resolved"}>{status}</StatusTag>
        <Separator>•</Separator>
        <Caption>{date}</Caption>
      </Meta>
    </CardLink>
  );
}

export default AssumptionCard;
