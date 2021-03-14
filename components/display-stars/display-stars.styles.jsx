import styled, { css } from "styled-components";
import tw from "tailwind.macro";
import ReactStarsRating from "react-awesome-stars-rating";

const getPointer = ({ cursor_pointer }) => {
  if(cursor_pointer){
    return css`${tw`cursor-pointer`}`
  }
}

export const ReactStarsContainer = styled(ReactStarsRating)`
  ${tw`flex focus:outline-none cursor-default`}

  ${getPointer}
`;
