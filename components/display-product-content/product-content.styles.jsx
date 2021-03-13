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

export const IntroduceContainer = styled.div`
  ${tw`w-98/100 text-lg whitespace-pre-line border-2 border-purple-800 p-1 mx-auto`}
`;

export const ExhibitDaysAndUserContainer = styled.div`
  ${tw`flex justify-end`}
`;