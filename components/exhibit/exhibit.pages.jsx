import React, { useState, useEffect } from "react";
import withApollo from "../../hoc/withApollo";
import WithAuthenticated from "../../hoc/withAuthenticated";
import { useDropzone } from "react-dropzone";
import {
  ContainerDropzone,
  DropzoneInput,
  DropzoneP,
  ExhibitContainer,
} from "./exhibit.styles";
import DisplayProductImages from "../display-product-images/product-images.component";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExhibitForm from "../exhibit-form/exhibit-form.component";
import { useCreateProduct } from "../../apollo/actions";
import { useRouter } from "next/router";
import GraphQLErrorMessages from "../graphql-error-message/graphql-error-message.component";

const Exhibit = () => {
  const [images, setImages] = useState([]);
  const accept = "image/*";
  const onDrop = (acceptedFiles) => {
    setImages(acceptedFiles.concat(images));
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    onDrop,
  });

  //配列の何番目の画像を表示するか
  const [index, setIndex] = useState(0);
  //表示画像の変更
  const handleClickLeftButton = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const handleClickRightButton = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  };

  //preview画像の削除機能
  const handleRemoveImage = () => {
    const newImages = images.filter((image) => {
      return image !== images[index];
    });
    setImages(newImages);
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  //画像のUPLoad構成
  const config = {
    headers: { "content-type": "multipart/form-data" }
  };

  //ファイル登録
  const registerProductImages = async () => {
    if (images.length != 0) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
      }
      const registerFiles = await axios
        .post("/api/product-images-upload", formData, config)
        .then(({ data: res }) => {
          return res.data;
        })
        .catch(() => {
          return null;
        });
      const getImagesPass = Object.values(registerFiles).map((registerFile) => {
        return registerFile.path.replaceAll("\\", "/").replace("public", "");
      });
      formik.values.imagePasses = getImagesPass;
    }
  };

  //GraphQL
  const [createProduct, { error }] = useCreateProduct();

  /**
   * formik設定
   */
  const initialValues = {
    name: "",
    category: "",
    price: 1000,
    quantity: 1,
    introduce: "",
    imagePasses: new Array(),
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("商品名を入力してください")
      .max(30, "商品名は30字以内で入力してください"),
    category: Yup.string()
      .required("カテゴリを入力してください")
      .max(30, "カテゴリの入力は30文字以内でお願いします。")
      .matches(/^(?!(\/)).*$/, "先頭は/以外にしてください")
      .matches("^(?!.*/$).*$", "最後の文字は/以外にしてください"),
    price: Yup.number()
      .required("値段を入力してください")
      .min(1, "値段を入力してください"),
    quantity: Yup.number().required("出品数を入力してください"),
    introduce: Yup.string()
      .required("商品の説明文を入力してください")
      .min(10, "商品の説明文は最低10文字以上入力してください")
      .max(1000, "商品の説明文は1000文字以内にまとめてください"),
  });
  const router = useRouter();
  const onSubmit = async (values) => {
    await registerProductImages();
    await createProduct({ variables: values });
    router.push("/");
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <ExhibitContainer>
      <ContainerDropzone
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <DropzoneInput {...getInputProps()} />
        {isDragActive ? (
          isDragAccept ? (
            <DropzoneP>UPLOAD</DropzoneP>
          ) : (
            <DropzoneP>REJECT</DropzoneP>
          )
        ) : (
          <DropzoneP>Drag Files</DropzoneP>
        )}
      </ContainerDropzone>
      {images.length != 0 && (
        <DisplayProductImages
          images={images}
          index={index}
          handleClickLeftButton={handleClickLeftButton}
          handleClickRightButton={handleClickRightButton}
          handleRemoveImage={handleRemoveImage}
        />
      )}
      <ExhibitForm formik={formik} />
      {error && <GraphQLErrorMessages error={"商品登録に失敗しました"}/>}
    </ExhibitContainer>
  );
};

export default withApollo(WithAuthenticated(Exhibit));
