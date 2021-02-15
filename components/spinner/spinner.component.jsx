import React from "react";
import { SpinnerAnimation, SpinnerOverlay } from "./spinner.styles";

const Spinner = () => (
  <SpinnerOverlay>
    <SpinnerAnimation />
  </SpinnerOverlay>
);

export default Spinner;
