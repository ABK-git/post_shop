import React from "react";
import { SignInContainer, SignInMessage, ErrorMessage } from "./sign-in.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import SignInForm from "../sign-in-form/sign-in-form.component";
import withApollo from "../../hoc/withApollo";
import { userSignIn } from "../../apollo/actions";
import WithUnAuthenticated from "../../hoc/withUnAuthenticated";
import Redirect from "../redirect";
import GraphQLErrorMessages from "../graphql-error-message/graphql-error-message.component";
import Spinner from "../spinner/spinner.component";
import { useRouter } from "next/router";

const SignIn = ({ apollo }) => {
  const [signIn, { data, loading, error }] = userSignIn();
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("emailを入力してください")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "正式なメールアドレスではありません"
      ),
    password: Yup.string()
      .required("passwordを入力してください")
      .min(4, "passwordは4文字以上で入力してください"),
  });

  const onSubmit = (values) => {
    signIn({ variables: values }).then(() => {
      apollo.resetStore().then(() => router.push("/"));
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  if (loading) return <Spinner />;

  return (
    <SignInContainer>
      <SignInMessage>Login</SignInMessage>
      <SignInForm formik={formik} />
      {error && <GraphQLErrorMessages error={error} />}
    </SignInContainer>
  );
};

export default withApollo(WithUnAuthenticated(SignIn));
