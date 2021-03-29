import React, { useState } from "react";
import { SignUpContainer, SignUpMessage } from "./sign-up.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import SignUpForm from "../sign-up-form/sign-up-form.component";
import withApollo from "../../hoc/withApollo";
import { userSignUp, userSignIn } from "../../apollo/actions";
import router from "next/router";
import WithUnAuthenticated from "../../hoc/withUnAuthenticated";
import GraphQLErrorMessages from "../graphql-error-message/graphql-error-message.component";
import Spinner from "../spinner/spinner.component";
import axios from "axios";
import PrepareUserImage from "../prepare-register-user-image/prepare-user-image.component";
import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_IMAGE_URL,
} from "../../.cloudinary";

const SignUp = ({ apollo }) => {
  const [signUp, { data, loading, error }] = userSignUp();
  const [createdUser, setCreatedUser] = useState([]);
  const [signIn, { loading: signInLoading }] = userSignIn();
  const [alreadySignIn, setAlreadySignIn] = useState(false);

  //画像のUPLoad関連
  const [file, setFile] = useState(null);
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const handleChangeSetFile = (event) => {
    let file = event.target.files[0];
    setFile(file);
  };
  const handleDeleteSetFile = () => {
    setFile(null);
  };
  const avatarUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    //multerがデプロイ環境で使えないのでコメントアウト
    // const avatar = await axios
    //   .post("/api/user-image-upload", formData, config)
    //   .then(({ data: res }) => {
    //     return res.avatar.replaceAll("\\", "/").replace("public", "");
    //   })
    //   .catch(() => {
    //     return null;
    //   });
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const options = {
      method: "POST",
      body: formData,
    };
    const avatar = await fetch(CLOUDINARY_UPLOAD_IMAGE_URL, options)
      .then((res) => {
        return res.json();
      })
      .catch(() => {
        return null;
      });
    console.log(avatar);
    if (avatar) {
      formik.values.avatar = avatar.secure_url;
    }
  };
  //formik関連
  const initialValues = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    avatar: "",
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

  const onSubmit = async (values) => {
    await avatarUpload();
    setCreatedUser(values);
    signUp({ variables: values });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  //User登録が完了し、認証が終わっていない場合
  if (data && data.signUp && !alreadySignIn) {
    setAlreadySignIn(true);
    const { email, password } = createdUser;
    signIn({ variables: { email, password } }).then(() => {
      apollo.resetStore().then(() => router.push("/"));
    });
  }

  if (loading || signInLoading) return <Spinner />;

  return (
    <SignUpContainer>
      <SignUpMessage>Register</SignUpMessage>
      <PrepareUserImage
        handleChangeSetFile={handleChangeSetFile}
        handleDeleteSetFile={handleDeleteSetFile}
        file={file}
      />
      <SignUpForm formik={formik} />
      {error && <GraphQLErrorMessages>{error}</GraphQLErrorMessages>}
    </SignUpContainer>
  );
};

export default withApollo(WithUnAuthenticated(SignUp));
