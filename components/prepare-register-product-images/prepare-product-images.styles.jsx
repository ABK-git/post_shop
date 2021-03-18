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

export const ResizeImagesAndRemoveButton = styled.div`
  ${tw`flex h-60 items-center justify-center relative`}
  &:hover {
    button {
      display: flex;
    }
  }
`;

export const RemoveImageButton = styled.button`
  ${tw`
  m-auto hidden flex-col justify-center items-center absolute
  font-bold text-xl sm:font-black sm:text-4xl bg-red-500 rounded-lg
  hover:bg-black hover:text-red-500
  `}
`;

export const ChevronRightButton = styled(ChevronRightCircle)`
  ${tw` w-10 text-blue-600 hover:text-red-600`}
  ${setVisible}
`;

export const ChevronLeftButton = styled(ChevronLeftCircle)`
  ${tw` w-10 text-blue-600 hover:text-red-600`};
  ${setVisible}
`;

export const ImageIndex = styled.p`
  ${tw`w-full text-center`}
`;
