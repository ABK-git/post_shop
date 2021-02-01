import React from "react";
import {
  SignUpContainer,
  SignUpMessage,
  SignUpForm,
  SignUpStart,
} from "./sign-up.styles";
import FormInput from "../form-input/form-input.component";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("名前を入力してください")
      .min(4, "名前は4文字以上で入力してください"),
    email: Yup.string()
      .required("emailを入力してください")
      .matches(/.{1}@.{1}/, "正式なメールアドレスではありません"),
    password: Yup.string()
      .required("passwordを入力してください")
      .min(4, "passwordは4文字以上で入力してください"),
    confirm_password: Yup.string()
      .required("パスワードを確認してください")
      .oneOf([Yup.ref("password")], "passwordが一致しません"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <SignUpContainer>
      <SignUpMessage>Register</SignUpMessage>
      <SignUpForm onSubmit={formik.handleSubmit}>
        <FormInput
          type="text"
          name="name"
          label="NAME"
          value={formik.values.name}
          handleChange={formik.handleChange}
          errorMessage={formik.errors.name}
          onBlur={formik.handleBlur}
          required
        />
        <FormInput
          type="email"
          name="email"
          label="E-MAIL"
          value={formik.values.email}
          handleChange={formik.handleChange}
          errorMessage={formik.errors.email}
          onBlur={formik.handleBlur}
          required
        />
        <FormInput
          type="password"
          name="password"
          label="PASSWORD"
          value={formik.values.password}
          handleChange={formik.handleChange}
          errorMessage={formik.errors.password}
          onBlur={formik.handleBlur}
          autoComplete="off"
          required
        />
        <FormInput
          type="password"
          name="confirm_password"
          label="CONFIRM-PASSWORD"
          value={formik.values.confirm_password}
          handleChange={formik.handleChange}
          errorMessage={formik.errors.confirm_password}
          onBlur={formik.handleBlur}
          autoComplete="off"
          required
        />
        <SignUpStart type="submit" value="SUBMIT" />
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;
