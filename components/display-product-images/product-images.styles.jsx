import styled from "styled-components";
import tw from "tailwind.macro";
import { ChevronLeftCircle, ChevronRightCircle } from "@styled-icons/boxicons-regular";

export const ProductImagesContainer = styled.div`
  ${tw`flex h-60`}
`;

export const ChevronRightButton = styled(ChevronRightCircle)`
  ${tw` w-10 `}
`;

export const ChevronLeftButton = styled(ChevronLeftCircle)`
  ${tw` w-10`}
`;
