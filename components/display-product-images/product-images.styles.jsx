import styled, { css } from "styled-components";
import tw from "tailwind.macro";
import {
  ChevronLeftCircle,
  ChevronRightCircle,
} from "@styled-icons/boxicons-regular";

const setVisible = ({ getVisibility }) => {
  if (getVisibility) {
    return visible;
  } else {
    return invisible;
  }
};
const visible = css`
  ${tw`visible`}
`;
const invisible = css`
  ${tw`invisible`}
`;

export const Flex = styled.div`
  ${tw`flex`}
`;

export const ChevronRightButton = styled(ChevronRightCircle)`
  ${tw` w-10 text-blue-600 hover:text-red-600 my-auto`}

  ${setVisible}
`;

export const ChevronLeftButton = styled(ChevronLeftCircle)`
  ${tw`w-10 text-blue-600 hover:text-red-600 my-auto`};

  ${setVisible}
`;

export const ToDetails = styled.div`
  ${tw`cursor-pointer z-0`}
`;


