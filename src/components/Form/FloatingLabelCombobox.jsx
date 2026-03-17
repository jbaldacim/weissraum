import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled(Command.Input)`
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
  top: ${({ $floating }) => ($floating ? "0" : "var(--space-sm)")};

  transition: all 180ms linear;
  pointer-events: none;
  white-space: nowrap;
`;

const PopoverContent = styled(Popover.Content)`
  width: var(--radix-popover-trigger-width);
  background: var(--color-background);
  border: var(--border-thin) var(--color-surface);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 50;
`;

const CommandList = styled(Command.List)`
  max-height: 12rem;
  overflow-y: auto;
`;

const CommandItem = styled(Command.Item)`
  font-family: var(--font-mono);
  font-size: var(--size-md);
  font-weight: var(--weight-regular);
  color: var(--color-text);

  padding: var(--space-xs) var(--space-sm);

  &[data-selected="true"] {
    background: var(--color-accent-soft);
    color: var(--color-accent);
  }
`;

const CreateItem = styled(CommandItem)`
  color: var(--color-muted);
  border-top: var(--border-thin) var(--color-surface);
`;

const Empty = styled(Command.Empty)`
  font-family: var(--font-sans);
  font-size: var(--size-sm);
  color: var(--color-muted);
  padding: var(--space-xs) var(--space-sm);
`;

const ClearButton = styled.button`
  font-weight: var(--weight-medium);
  color: var(--color-muted);
  position: absolute;
  right: 0;
  top: 50%;
  padding: var(--space-sm) 0 0.375rem 0;
  transform: translateY(-50%);

  background: none;
  border: none;
  outline: none;

  cursor: pointer;

  transition: color 180ms linear;

  &:hover {
    color: var(--color-text);
  }
`;

function FloatingLabelCombobox({ label, id, categories = [], onChange }) {
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const inputRef = useRef(null);

  const floating = focused || inputValue.length > 0;

  const exactMatchExists = categories.some(
    (cat) => cat.toLowerCase() === inputValue.toLowerCase(),
  );

  const showCreate = inputValue.length > 0 && !exactMatchExists;

  function handleSelect(value) {
    setSelectedValue(value);
    setInputValue(value);
    setOpen(false);
    onChange?.(value);
  }

  function handleCreate() {
    handleSelect(inputValue);
  }

  function handleInputChange(value) {
    setInputValue(value);
    setSelectedValue("");
    setOpen(true);
  }

  function handleFocus() {
    setFocused(true);
    setOpen(true);
  }

  function handleBlur() {
    setFocused(false);
    setTimeout(() => setOpen(false), 150);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  function handleClear() {
    setInputValue("");
    setSelectedValue("");
    setOpen(true);
    inputRef?.current?.focus();
  }

  return (
    <Wrapper>
      <Command shouldFilter={true}>
        {inputValue.length > 0 && (
          <ClearButton
            onClick={handleClear}
            onMouseDown={(e) => e.preventDefault()}
          >
            ×
          </ClearButton>
        )}
        <Label htmlFor={id} $floating={floating} $focused={focused}>
          {label}
        </Label>

        <Popover.Root open={open}>
          <Popover.Anchor asChild>
            <Input
              ref={inputRef}
              id={id}
              value={inputValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onValueChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </Popover.Anchor>

          <Popover.Portal>
            <PopoverContent
              onOpenAutoFocus={(e) => e.preventDefault()}
              sideOffset={4}
            >
              <CommandList>
                <Empty>No categories found.</Empty>
                <Command.Group>
                  {categories.map((cat) => (
                    <CommandItem
                      key={cat}
                      value={cat}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={() => handleSelect(cat)}
                    >
                      {cat}
                    </CommandItem>
                  ))}
                </Command.Group>
                {showCreate && (
                  <CreateItem
                    value={`create-${inputValue}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={handleCreate}
                  >
                    Create "{inputValue}"
                  </CreateItem>
                )}
              </CommandList>
            </PopoverContent>
          </Popover.Portal>
        </Popover.Root>
      </Command>
    </Wrapper>
  );
}

export default FloatingLabelCombobox;
