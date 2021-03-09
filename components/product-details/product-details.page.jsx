import React, { useState } from "react";
import moment from "moment";
import {
  ProductDetailsContainer,
  DetailsMain,
  ProductIntroduceContainer,
  Introduce,
  SetNameAndContent,
  InName,
  InContent,
  CategoriesLeftJustify,
  SetNameAndContentJustifyRight,
  ExhibitDaysAndUserContainer,
  OpenButtons,
  DisplayQuestions,
  DisplayQuestionsMessage,
  ToExhibitQuestion,
  LeftContainer,
  ExhibitQuestionForm,
  ExhibitQuestionFormLabel,
  ExhibitTitleContainer,
  ExhibitContentContainer,
} from "./product-details.styles";
import DisplayCategories from "../display-categories/display-categories.component";
import DisplayProductImages from "../display-product-images/product-images.component";
import CustomButton from "../custom-button/custom-button.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import QuestionForm from "../question-form/question-form.component";

const ProductDetails = ({ product }) => {
  const [displayQuestions, setDisplayQuestions] = useState(false);
  const [exhibitOrList, setExhibitOrList] = useState(false);
  const changeDisplayQuestions = () => {
    setDisplayQuestions(!displayQuestions);
  };
  const changeExhibitOrList = () => {
    setExhibitOrList(!exhibitOrList);
  };

  /**
   * formik
   */
  const initialValues = {
    title: "",
    content: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("titleを入力してください")
      .max(255, "titleは255文字以内で入力してください"),
    content: Yup.string()
      .required("contentを入力してください")
      .max(1000, "質問内容は1000文字以内で入力してください"),
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
    <ProductDetailsContainer>
      <CategoriesLeftJustify>
        <DisplayCategories categories={product.categories} />
      </CategoriesLeftJustify>

      <DetailsMain>
        <DisplayProductImages images={product.imagePasses} />
        <ProductIntroduceContainer>
          <Introduce>商品詳細</Introduce>
          <SetNameAndContent>
            <InName>商品名: </InName>
            <InContent>{product.name}</InContent>
          </SetNameAndContent>
          <SetNameAndContent>
            <InName>値段:</InName>
            <InContent>{product.price}</InContent>
          </SetNameAndContent>
          <SetNameAndContent>
            <InName>在庫:</InName>
            <InContent>{product.quantity}</InContent>
          </SetNameAndContent>
          <SetNameAndContent>
            <InName>説明:</InName>
            <InContent>{product.introduce}</InContent>
          </SetNameAndContent>

          <ExhibitDaysAndUserContainer>
            <SetNameAndContentJustifyRight>
              <InName>出品者:</InName>
              <InContent>{product.user.username}</InContent>
            </SetNameAndContentJustifyRight>
            <SetNameAndContentJustifyRight>
              <InName>出品日:</InName>
              <InContent>
                {moment(product.createdAt.parseInt).format("L")}
              </InContent>
            </SetNameAndContentJustifyRight>
          </ExhibitDaysAndUserContainer>
        </ProductIntroduceContainer>
      </DetailsMain>
      <OpenButtons>
        <CustomButton design="open_questions" onClick={changeDisplayQuestions}>
          Questions
        </CustomButton>
        <CustomButton design="open_reviews">Reviews</CustomButton>
      </OpenButtons>

      <DisplayQuestions>
        {displayQuestions && (
          <div>
            <DisplayQuestionsMessage>
              この商品に対する質問一覧
            </DisplayQuestionsMessage>
            {!exhibitOrList && <QuestionForm formik={formik} />}
            {exhibitOrList ? (
              <ToExhibitQuestion onClick={changeExhibitOrList}>
                質問をする
              </ToExhibitQuestion>
            ) : (
              <LeftContainer>
                <CustomButton design="to_list" onClick={changeExhibitOrList}>
                  質問一覧へ戻る
                </CustomButton>
              </LeftContainer>
            )}
          </div>
        )}
      </DisplayQuestions>
    </ProductDetailsContainer>
  );
};
export default ProductDetails;
