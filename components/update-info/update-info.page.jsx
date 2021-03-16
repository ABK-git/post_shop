import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SignUpForm from "../sign-up-form/sign-up-form.component";
import Redirect from "../redirect";
import GraphQLErrorMessages from "../graphql-error-message/graphql-error-message.component";
import Spinner from "../spinner/spinner.component";
import axios from "axios";
import PrepareUserImage from "../prepare-register-user-image/prepare-user-image.component";
import { UpdateInfoContainer, TitleMessage } from "./update-info.styles";

const UpdateInfo = ({ user }) => {
  //const [signUp, { data, loading, error }] = userSignUp();

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
    const avatar = await axios
      .post("/api/user-image-upload", formData, config)
      .then(({ data: res }) => {
        return res.avatar.replaceAll("\\", "/").replace("public", "");
      })
      .catch(() => {
        return null;
      });
    if (avatar) {
      formik.values.avatar = avatar;
    }
  };
  //formik関連
  const initialValues = {
    username: user.username,
    email: user.email,
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
    console.log(values);
    //signUp({ variables: values });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  //User登録が完了し、認証が終わっていない場合
  //if (data && data.signUp) {}

  //if (loading) return <Spinner />;

  return (
    <UpdateInfoContainer>
      <TitleMessage>UPDATE</TitleMessage>
      <PrepareUserImage
        handleChangeSetFile={handleChangeSetFile}
        handleDeleteSetFile={handleDeleteSetFile}
        file={file}
        avatar={user.avatar}
      />
      <SignUpForm formik={formik} />
    </UpdateInfoContainer>
  );
};

export default UpdateInfo;
