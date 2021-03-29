import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SignUpForm from "../sign-up-form/sign-up-form.component";
import Redirect from "../redirect";
import GraphQLErrorMessages from "../graphql-error-message/graphql-error-message.component";
import Spinner from "../spinner/spinner.component";
import axios from "axios";
import PrepareUserImage from "../prepare-register-user-image/prepare-user-image.component";
import { UpdateInfoContainer, TitleMessage } from "./update-info.styles";
import { userUpdate } from "../../apollo/actions";
import MyContext from "../../context";
import {
  CLOUDINARY_UPLOAD_IMAGE_URL,
  CLOUDINARY_UPLOAD_PRESET,
} from "../../cloudinary";

const UpdateInfo = () => {
  const [updateUser, { data, loading, error }] = userUpdate();
  //context
  const my_context = useContext(MyContext);
  const { user } = my_context;

  //画像のUPLoad関連
  const [file, setFile] = useState(null);
  //multerがデプロイ環境で使えないのでコメントアウト
  // const config = {
  //   headers: { "content-type": "multipart/form-data" },
  // };
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
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const options = {
      method: "POST",
      body: formData,
    };
    const avatar = await fetch(CLOUDINARY_UPLOAD_IMAGE_URL, options)
      .then((res) => {
        //multerがデプロイ環境で使えないのでコメントアウト
        //return res.avatar.replaceAll("\\", "/").replace("public", "");
        return res.json();
      })
      .catch(() => {
        return null;
      });
    if (avatar) {
      formik.values.avatar = avatar.secure_url;
    }
  };
  //formik関連
  const initialValues = {
    username: user && user.username,
    email: user && user.email,
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
    updateUser({ variables: values });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  //User編集後
  if (loading) {
    return <Spinner />;
  }
  if (data && data.updateUser) {
    return <Redirect to="/" />;
  }

  return (
    <UpdateInfoContainer>
      <TitleMessage>UPDATE</TitleMessage>
      <PrepareUserImage
        handleChangeSetFile={handleChangeSetFile}
        handleDeleteSetFile={handleDeleteSetFile}
        file={file}
        avatar={user && user.avatar}
      />
      {error && <GraphQLErrorMessages>{error}</GraphQLErrorMessages>}
      <SignUpForm formik={formik} />
    </UpdateInfoContainer>
  );
};

export default UpdateInfo;
