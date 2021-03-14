import styled from "styled-components";
import tw from "tailwind.macro";
import ReactStarsRating from "react-awesome-stars-rating";

export const ReactStarsContainer = styled(ReactStarsRating)`
  ${tw`flex focus:outline-none`}
`;
