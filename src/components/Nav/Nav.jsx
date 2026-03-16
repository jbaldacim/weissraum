import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.nav`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border-bottom: var(--border-thin) var(--color-surface);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-lg);
`;

const StyledNavLink = styled(NavLink)`
  font-family: var(--font-sans);
  font-size: var(--size-sm);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-muted);
  text-decoration: none;

  transition: color 180ms linear;

  &.active {
    color: var(--color-accent);
  }

  &:hover:not(.active) {
    color: var(--color-text);
  }
`;

function Nav() {
  return (
    <Wrapper>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledNavLink to="/archive">Archive</StyledNavLink>
      <StyledNavLink to="/entries/new">New Entry</StyledNavLink>
    </Wrapper>
  );
}

export default Nav;
