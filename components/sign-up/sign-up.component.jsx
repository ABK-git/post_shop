import React from "react";
import { SignUpContainer, SignUpMessage } from "./sign-up.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import SignUpForm from "../sign-up-form/sign-up-form.component";
import withApollo from "../../hoc/withApollo";
import { userSignUp } from "../../apollo/actions";
import Redirect from "../redirect";
import WithUnAuthenticated from "../../hoc/withUnAuthenticated";

const SignUp = () => {
  const [signUp, { data, loading, error }] = userSignUp();

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
    signUp({ variables: values });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  
  //User登録に成功した場合
  const user = (data && data.signUp) || null;
  if(user != null){
    console.log(user);
  }

  return (
    <SignUpContainer>
      <SignUpMessage>Register</SignUpMessage>
      <SignUpForm formik={formik} />
      {data && data.signUp && <Redirect to="/" />}
    </SignUpContainer>
  );
};

export default withApollo(WithUnAuthenticated(SignUp));
