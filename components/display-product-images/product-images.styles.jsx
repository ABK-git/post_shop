import styled, { css } from "styled-components";
import tw from "tailwind.macro";
import {
  ChevronLeftCircle,
  ChevronRightCircle,
} from "@styled-icons/boxicons-regular";

const setVisible = ({ getVisibility }) => {
  if (getVisibility) {
    return invisible;
  } else {
    return visible;
  }
};

const visible = css`
  ${tw`visible`}
`;
const invisible = css`
  ${tw`invisible`}
`;

export const ProductImagesContainer = styled.div`
  ${tw`flex h-60`}
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
