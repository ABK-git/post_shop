import React from "react";
import FormInput from "../form-input/form-input.component";
import TextareaInput from "../textarea-input/textarea-input.component";

import {
  ExhibitFormContainer,
  RegisterProductButton,
} from "./exhibit-form.styles";

const ExhibitForm = ({ formik }) => (
  <ExhibitFormContainer onSubmit={formik.handleSubmit}>
    <FormInput
      type="text"
      name="name"
      label="name"
      placeholder="商品名"
      value={formik.values.name}
      handleChange={formik.handleChange}
      errorMessage={formik.errors.name}
      required
    />
    <FormInput
      type="text"
      name="category"
      label="category"
      placeholder="複数入力する場合は/で区切ってください"
      value={formik.values.category}
      handleChange={formik.handleChange}
      errorMessage={formik.errors.category}
      required
    />
    <FormInput
      type="number"
      name="price"
      label="price"
      step="100"
      min="0"
      placeholder="値段"
      value={formik.values.price}
      handleChange={formik.handleChange}
      errorMessage={formik.errors.price}
      required
    />
    <FormInput
      type="number"
      name="quantity"
      label="quantity"
      step="1"
      min="1"
      placeholder="出品数"
      value={formik.values.quantity}
      handleChange={formik.handleChange}
      errorMessage={formik.errors.quantity}
      required
    />
    <TextareaInput
      label="introduce"
      name="introduce"
      placeholder="商品の紹介文"
      maxLength="1000"
      rows="5"
      value={formik.values.introduce}
      handleChange={formik.handleChange}
      errorMessage={formik.errors.introduce}
    />
    <RegisterProductButton type="submit">Submit</RegisterProductButton>
  </ExhibitFormContainer>
);

export default ExhibitForm;
