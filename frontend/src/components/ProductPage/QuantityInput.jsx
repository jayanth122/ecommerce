import { useState } from "react";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { fontWeight, styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

// https://mui.com/base-ui/react-number-input/

const QuantityInput = ({ quantity, setQuantity, min=1, max=99 }) => {
  return (
    <NumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: (
            <AddIcon
              sx={{ fontSize: 10, strokeWidth: 1, stroke: "white", margin: 0 }}
            />
          ),
          className: "increment",
        },
        decrementButton: {
          children: (
            <RemoveIcon
              sx={{ fontSize: 10, strokeWidth: 1, stroke: "white" }}
            />
          ),
          className: "decrement",
        },
      }}
      min={min}
      max={max}
      aria-label="Demo number input"
      value={quantity}
      onChange={(event, val) => setQuantity(val)}
    />
  );
};

export const CartQuantityInput = ({ quantity, setQuantity, cartItemId, min=0, max=99 }) => {
  return (
    <NumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: (
            <AddIcon
              sx={{ fontSize: 10, strokeWidth: 1, stroke: "white", margin: 0 }}
            />
          ),
          className: "increment",
        },
        decrementButton: {
          children: (
            <RemoveIcon
              sx={{ fontSize: 10, strokeWidth: 1, stroke: "white" }}
            />
          ),
          className: "decrement",
        },
      }}
      min={min}
      max={max}
      aria-label="Demo number input"
      value={quantity}
      onChange={(event, val) => setQuantity(cartItemId, val)}
    />
  );
};

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  () => `
  font-weight: 400;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  border: 1px solid grey;
  border-radius: 8px;
  margin: 8px 8px;
  padding: 5px 5px;
  outline: 0;
  min-width: 0;
  width: 1rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.5rem;
  box-sizing: border-box;
  line-height: 1.5;
  border-radius: 50%;
  background: ${grey[700]};
  color: white;
  width: 15px;
  height: 15px;
  padding: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    border-color: ${blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);

export default QuantityInput;
