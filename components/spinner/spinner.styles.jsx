import { Spinner9 } from "@styled-icons/icomoon";
import styled from "styled-components";
import tw from "tailwind.macro";

export const SpinnerOverlay = styled.div`
  ${tw`w-full h-full flex justify-center items-center`}
`;

export const SpinnerAnimation = styled(Spinner9)`
  ${tw`w-1/2 m-5 `}
  animation: spin 0.8s ease-in-out infinite;
  -webkit-animation: spin 0.8s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
