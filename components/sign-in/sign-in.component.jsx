import React from "react";
import { SignInContainer, SignInMessage } from "./sign-in.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import SignInForm from "../sign-in-form/sign-in-form.component";
import withApollo from "../../hoc/withApollo";
import { userSignIn } from "../../apollo/actions";
import WithUnAuthenticated from "../../hoc/withUnAuthenticated";
import Redirect from "../redirect";
import ErrorMessagesContainer from "../form-input/error-messages.container";

const SignIn = () => {
  const [signIn, { data, loading, error }] = userSignIn();

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
    signIn({ variables: values });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  //User登録に成功した場合
  const user = (data && data.signIn) || null;
  if (user != null) {
    console.log(user);
  }

  return (
    <SignInContainer>
      <SignInMessage>Login</SignInMessage>
      <SignInForm formik={formik} />
      {data && data.signIn && <Redirect to="/" />}
      {error && <ErrorMessagesContainer errorMessage={error} />}
    </SignInContainer>
  );
};

export default withApollo(WithUnAuthenticated(SignIn));
