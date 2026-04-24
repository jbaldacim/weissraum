import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  padding: 0.25rem;

  color: var(--color-accent);
  cursor: pointer;

  transition: color 180ms linear;

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  .label-wrapper {
    overflow: hidden;
    display: inline-block;
    padding-left: 0.5rem;
  }

  .label {
    display: inline-block;
    transition:
      opacity 180ms linear,
      transform 180ms linear;

    @media screen and (min-width: 768px) {
      opacity: 0;
      transform: translateX(-100%);
    }
  }

  &:hover .label {
    opacity: 1;
    transform: translateX(0);
  }
`;

function BackButton({ fallbackTo = "/" }) {
  const navigate = useNavigate();

  function handleClick() {
    // Prefer in-app back navigation
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackTo);
    }
  }

  return (
    <Button onClick={handleClick} aria-label="Voltar">
      <span aria-hidden="true">←</span>
      <span className="label-wrapper">
        <span className="label">Go back</span>
      </span>
    </Button>
  );
}

export default BackButton;
