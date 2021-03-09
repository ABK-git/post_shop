import styled from "styled-components";
import tw from "tailwind.macro";


export const DetailsMain = styled.div`
  ${tw`pt-10 w-full flex flex-col items-center`}
`;

export const OpenButtons = styled.div`
  ${tw`mt-10 flex w-4/5 justify-around`}
`;

export const CategoriesLeftJustify = styled.div`
  ${tw`w-full text-left`}
`;

export const ProductIntroduceContainer = styled.div`
  ${tw`w-4/5 bg-white mt-5 border-4 border-green-700`}
`;

export const Introduce = styled.p`
  ${tw`text-2xl font-bold whitespace-no-wrap`}
`;

export const SetNameAndContent = styled.div`
  ${tw`flex`}
`;

export const InName = styled.p`
  ${tw`text-lg text-gray-600 font-semibold whitespace-no-wrap`}
`;

export const InContent = styled.p`
  ${tw`text-lg ml-1 whitespace-pre-line`}
`;

export const SetNameAndContentJustifyRight = styled.div`
  ${tw`flex justify-start mr-1 sm:w-1/3`}
`;

export const ExhibitDaysAndUserContainer = styled.div`
  ${tw`w-2/3 sm:w-1/4 ml-auto`}
`;