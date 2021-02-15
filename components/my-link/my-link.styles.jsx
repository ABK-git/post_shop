import styled, { css } from "styled-components";
import tw from "tailwind.macro";

const headerLeft = css`
  ${tw`text-red-800`}
`;
const headerRight = css`
  ${tw`text-yellow-600`}
`;
const smMenu = css`
  ${tw`w-full text-green-400 block text-center m-0 p-0 border-2 border-red-600`}
`;

const getLinkStyles = ({ design }) => {
  switch (design) {
    case "header-left":
      return headerLeft;
    case "header-right":
      return headerRight;
    case "sm-menu":
      return smMenu;
    default:
      return "";
  }
};

export const LinkContainer = styled.span`
  ${tw`font-bold text-xl m-2 cursor-pointer`}

  ${getLinkStyles}
`;
