import React from "react";
import FormInput from "../form-input/form-input.component";

import { SignInFormContainer, SignInStart } from "./sign-in-form.styles";

const SignInForm = ({ formik }) => (
  <SignInFormContainer onSubmit={formik.handleSubmit}>
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
    <SignInStart type="submit" value="SUBMIT" />
  </SignInFormContainer>
);

export default SignInForm;
