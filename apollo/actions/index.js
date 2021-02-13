import { useMutation } from "@apollo/react-hooks";
import { SIGN_UP } from "../queries";

export const userSignUp = () => useMutation(SIGN_UP);
