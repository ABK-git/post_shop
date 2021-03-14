import styled from "styled-components";
import tw from "tailwind.macro";

import FormInput from "../form-input/form-input.component";
import TextareaInput from "../textarea-input/textarea-input.component";

export const ExhibitReviewForm = styled.div`
  ${tw`w-full bg-white p-2`}
`;

export const ExhibitReviewFormLabel = styled.div`
  ${tw`text-left font-bold text-xl sm:text-3xl`}
`;

export const ExhibitTitleContainer = styled(FormInput)`
  ${tw`w-full border-2 border-blue-400 text-left focus:border-blue-400`}
`;

export const ExhibitContentContainer = styled(TextareaInput)`
  ${tw`w-full border-2 border-blue-400 text-left focus:border-blue-400`}
`;
