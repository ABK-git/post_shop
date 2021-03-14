import React from "react";
import { ReactStarsContainer } from "./display-stars.styles";

const DisplayStars = ({ ...otherProps }) => (
  <ReactStarsContainer {...otherProps} />
);

export default DisplayStars;
