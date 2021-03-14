import styled, { css } from "styled-components";
import tw from "tailwind.macro";
import { Search } from "@styled-icons/boxicons-regular";
import FormInput from "../form-input/form-input.component";

export const HomeContainer = styled.div`
  ${tw`h-screen w-full text-center pb-5 overflow-auto bg-gray-500`}
`;

export const HomeTitleMessage = styled.h1`
  ${tw`text-green-600 font-bold text-3xl sm:text-5xl mt-2 whitespace-no-wrap`}
`;

export const ProductsLayout = styled.table`
  ${tw`table w-4/5 h-11/12 mx-auto`}
`;
export const DisplaySearchButton = styled.button`
  ${tw`w-full text-2xl text-center font-bold text-yellow-500 bg-blue-900 hover:bg-gray-800 hover:text-green-300`}
`;

export const OpenSearch = styled(Search)`
  ${tw`w-10 text-yellow-600`}
`;

export const SearchConditionInput = styled.div`
  ${tw`w-full text-center block bg-yellow-500 p-0`}
`;

export const SearchPriceDiv = styled.div`
  ${tw`w-full flex text-center`}
`;

export const PriceFormInput = styled(FormInput)`
  ${tw`w-4/5`}
`;

export const GroupContainer = styled.div`
  ${tw`flex flex-col items-center w-full text-2xl`}
`;

export const FormInputButton = styled.button`
  ${tw`w-full font-bold text-center bg-blue-400`};
`;

export const OptionButton = styled.button`
  ${tw`w-full font-bold text-center border-2 border-red-600 text-green-400 bg-green-800 block`};
`;

export const MaxTbody = styled.tbody`
  ${tw`w-full text-center`}
`;

export const MaxTd = styled.td`
  ${tw`table-cell w-1/2 inline-block sm:w-1/3 m-0 p-0`}
`;

export const MaxTr = styled.tr`
  ${tw`w-full`}
`;

export const MaxTable = styled.table`
  ${tw`w-full`}
`;
