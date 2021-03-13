import styled from "styled-components";
import tw from "tailwind.macro";

export const ProductCell = styled.td`
  ${tw`table-cell inline-block border-2 border-red-700 bg-yellow-200`}
`;

export const ProductIntroduce = styled.div`
  ${tw`h-full w-56 cursor-pointer `}
`;

export const Overhidden = styled.p`
  ${tw`overflow-x-hidden`}
`;
