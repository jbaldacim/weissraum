import { Link, useViewTransitionState } from "react-router-dom";
import styled, { css } from "styled-components";
import { Body, Caption } from "../Typography/Text";
import { CategoryTag, StatusTag } from "../Tag/Tag";

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  padding: var(--space-sm) 0;
  border-top: var(--border-thin) var(--color-surface);
  cursor: pointer;
  text-decoration: none;

  transition: border-color 180ms linear;

  &:hover {
    border-top-color: var(--color-muted);
  }
`;

const Assumption = styled(Body)`
  flex: 1;
  color: var(--color-text);
`;

const Meta = css`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-shrink: 0;
`;

const Tags = styled.div`
  ${Meta}
`;

const Date = styled.div`
  ${Meta}
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
      <Tags>
        <CategoryTag>{category}</CategoryTag>
        <StatusTag $resolved={status === "resolved"}>{status}</StatusTag>
      </Tags>
      <Assumption>{assumption}</Assumption>
      <Date>
        <Caption>{date}</Caption>
      </Date>
    </CardLink>
  );
}

export { Tags };
export default AssumptionCard;
