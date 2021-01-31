import React from "react";
import Header from "../../components/header/header.component";
import SignUp from "../../components/sign-up/sign-up.component";
import { FullScreen } from "./index.styles";

const Register = () => {
  return (
    <FullScreen>
      <Header />
      <SignUp />
    </FullScreen>
  );
};

export default Register;
