import { Button, ThemeProvider } from "@mui/material";
import React from "react";
import "./Button.scss";
import { theme } from "./ButtonTheme";

const FunctionButton = ({ title, clickAction = () => {return null}, size='small'}) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        color="secondary"
        className="function-button"
        onClick={(e) => clickAction(e)}
        size={size}
        variant="contained"
      >
        {title}
      </Button>
    </ThemeProvider>
  );
};

export default FunctionButton;
