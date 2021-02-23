import styled from "styled-components";
import tw from "tailwind.macro";
import { Search } from "@styled-icons/boxicons-regular";
import FormInput from "../form-input/form-input.component";

export const HomeContainer = styled.div`
  ${tw`h-screen w-full text-center pb-5 overflow-auto bg-gray-500`}
`;

export const HomeTitleMessage = styled.h1`
  ${tw`text-green-600 font-bold text-2xl sm:text-5xl mt-2`}
`;

export const ProductsLayout = styled.table`
  ${tw`table w-4/5 h-11/12 mx-auto`}
`;

export const DisplaySearchButton = styled.button`
  ${tw`w-full text-2xl text-center font-bold text-yellow-500 bg-red-600 hover:bg-gray-800 hover:text-green-300`}
`;

export const OpenSearch = styled(Search)`
  ${tw`w-10 text-yellow-600`}
`;

export const SearchConditionInput = styled.div`
  ${tw`w-full text-center block bg-yellow-500`}
`;

export const SearchPriceDiv = styled.div`
  ${tw`w-full flex text-center`}
`;

export const PriceFormInput = styled(FormInput)`
  ${tw`w-4/5`}
`;
