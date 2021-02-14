import { useMutation, useQuery } from "@apollo/react-hooks";
import { SIGN_IN, SIGN_UP, GET_USER } from "../queries";

//User認証
export const userSignUp = () => useMutation(SIGN_UP);
export const userSignIn = () =>
  useMutation(SIGN_IN, {
    update(cache, data) {
      cache.writeQuery({
        query: GET_USER,
        data,
      });
    },
  });
export const getAuthUser = () => useQuery(GET_USER);
