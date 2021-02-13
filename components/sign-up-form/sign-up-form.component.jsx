import React from "react";
import FormInput from "../form-input/form-input.component";

import { SignUpFormContainer, SignUpStart } from "./sign-up-form.styles";

const SignUpForm = ({ formik, loading }) => (
  <SignUpFormContainer onSubmit={formik.handleSubmit}>
    <FormInput
      type="text"
      name="username"
      label="NAME"
      value={formik.values.username}
      handleChange={formik.handleChange}
      errorMessage={formik.errors.username}
      required
    />
    <FormInput
      type="email"
      name="email"
      label="E-MAIL"
      value={formik.values.email}
      handleChange={formik.handleChange}
      errorMessage={formik.errors.email}
      required
    />
    <FormInput
      type="password"
      name="password"
      label="PASSWORD"
      value={formik.values.password}
      handleChange={formik.handleChange}
      errorMessage={formik.errors.password}
      autoComplete="off"
      required
    />
    <FormInput
      type="password"
      name="password_confirm"
      label="CONFIRM-PASSWORD"
      value={formik.values.password_confirm}
      handleChange={formik.handleChange}
      errorMessage={formik.errors.password_confirm}
      autoComplete="off"
      required
    />
    <SignUpStart type="submit" value="SUBMIT" disabled={loading}/>
  </SignUpFormContainer>
);

export default SignUpForm;
