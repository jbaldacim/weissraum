import * as SelectPrimitive from "@radix-ui/react-select";
import styled from "styled-components";

// Trigger: looks exactly like your FloatingLabelField's input
const StyledTrigger = styled(SelectPrimitive.Trigger)`
  font-family: var(--font-mono);
  font-size: var(--size-md);
  font-weight: var(--weight-regular);
  line-height: var(--leading-loose);
  color: var(--color-text);

  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xs);

  width: 100%;
  padding: var(--space-sm) 0 0.375rem 0;
  background: transparent;
  border: none;
  border-bottom: var(--border-thin) var(--color-muted);
  outline: none;
  cursor: pointer;

  transition: border-color 180ms linear;

  &:focus,
  &[data-state="open"] {
    border-color: var(--color-accent);
  }
`;

const Chevron = styled.span`
  font-family: var(--font-sans);
  color: var(--color-muted);
  transition: transform 180ms linear;

  [data-state="open"] & {
    transform: rotate(180deg);
  }
`;

// Content popover
const StyledContent = styled(SelectPrimitive.Content)`
  background: var(--color-background);
  border: var(--border-thin) var(--color-surface);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 50;
  min-width: var(--radix-select-trigger-width);
`;

// Items list
const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: var(--space-xs) 0;
`;

const StyledItem = styled(SelectPrimitive.Item)`
  font-family: var(--font-mono);
  font-size: var(--size-md);
  font-weight: var(--weight-regular);
  color: var(--color-text);
  padding: var(--space-xs) var(--space-sm);

  outline: none;
  cursor: pointer;

  &[data-highlighted] {
    background: var(--color-accent-soft);
    color: var(--color-accent);
  }
`;

// Label (if you want a floating‑label effect, we can adapt later; for now keep it simple)
const StyledLabel = styled(SelectPrimitive.Label)`
  font-family: var(--font-sans);
  font-size: var(--size-sm);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-muted);
  padding: var(--space-xs) var(--space-sm);
`;

const StyledSeparator = styled(SelectPrimitive.Separator)`
  height: 1px;
  background: var(--color-surface);
  margin: var(--space-xs) 0;
`;

function Select({
  label,
  value,
  onValueChange,
  options = [],
  placeholder = "Select...",
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <StyledTrigger aria-label={label}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <Chevron aria-hidden="true">▾</Chevron>
        </SelectPrimitive.Icon>
      </StyledTrigger>

      <SelectPrimitive.Portal>
        <StyledContent position="popper" sideOffset={4}>
          <StyledViewport>
            <SelectPrimitive.Group>
              {label && <StyledLabel>{label}</StyledLabel>}
              {options.map((opt) => (
                <StyledItem key={opt.value} value={opt.value}>
                  <SelectPrimitive.ItemText>
                    {opt.label}
                  </SelectPrimitive.ItemText>
                </StyledItem>
              ))}
            </SelectPrimitive.Group>
            <StyledSeparator />
          </StyledViewport>
        </StyledContent>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export default Select;
