import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  font-family: var(--font-mono);
  font-size: var(--size-md);
  font-weight: var(--weight-regular);
  line-height: var(--leading-loose);
  color: var(--color-text);

  width: 100%;
  padding: var(--space-sm) 0 0.375rem 0;
  background: transparent;

  border: none;
  border-bottom: var(--border-thin) var(--color-muted);
  outline: none;

  transition: border-color 180ms linear;

  &:focus {
    border-color: var(--color-accent);
  }
`;

const Label = styled.label`
  font-family: var(--font-sans);
  font-size: ${({ $floating }) =>
    $floating ? "var(--size-sm)" : "var(--size-md)"};
  font-weight: var(--weight-medium);
  letter-spacing: ${({ $floating }) =>
    $floating ? "var(--tracking-wider)" : "var(--tracking-normal)"};
  color: ${({ $focused }) =>
    $focused ? "var(--color-accent)" : "var(--color-muted)"};

  position: absolute;
  left: 0;
  top: ${({ $floating }) => ($floating ? "0" : "50%")};

  transition: all 180ms linear;
  pointer-events: none;
  white-space: nowrap;
`;

function FloatingLabelField({ label, id, ...rest }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const floating = focused || value.length > 0;

  return (
    <Wrapper>
      <Label htmlFor={id} $floating={floating} $focused={focused}>
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        {...rest}
      />
    </Wrapper>
  );
}

export default FloatingLabelField;
