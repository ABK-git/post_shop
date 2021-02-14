import React, { useState } from "react";
import { SignUpContainer, SignUpMessage } from "./sign-up.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import SignUpForm from "../sign-up-form/sign-up-form.component";
import withApollo from "../../hoc/withApollo";
import { userSignUp, userSignIn } from "../../apollo/actions";
import Redirect from "../redirect";
import WithUnAuthenticated from "../../hoc/withUnAuthenticated";
import GraphQLErrorMessages from "../graphql-error-message/graphql-error-message.component";

const SignUp = () => {
  const [signUp, { data, loading, error }] = userSignUp();
  const [createdUser, setCreatedUser] = useState([]);
  const [
    signIn,
    { data: authUser, loading: signInLoading, error: signInError },
  ] = userSignIn();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("名前を入力してください")
      .min(4, "名前は4文字以上で入力してください"),
    email: Yup.string()
      .required("emailを入力してください")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "正式なメールアドレスではありません"
      ),
    password: Yup.string()
      .required("passwordを入力してください")
      .min(4, "passwordは4文字以上で入力してください"),
    password_confirm: Yup.string()
      .required("パスワードを確認してください")
      .oneOf([Yup.ref("password")], "passwordが一致しません"),
  });

  const onSubmit = (values) => {
    setCreatedUser(values);
    signUp({ variables: values });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  //User登録が完了し、認証が終わっていない場合
  if (data && data.signUp && !authUser) {
    const { email, password } = createdUser;
    console.log("after signUp")
    console.log(`${email}と${password}`)
    signIn({ variables: { email, password } });
  }
  if(authUser){
    console.log("authUser");
    console.log(authUser);
  }

  return (
    <SignUpContainer>
      <SignUpMessage>Register</SignUpMessage>
      <SignUpForm formik={formik} />
      {authUser && authUser.signIn && <Redirect to="/" />}
      {error && <GraphQLErrorMessages error={error} />}
    </SignUpContainer>
  );
};

export default withApollo(WithUnAuthenticated(SignUp));
