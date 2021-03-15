import React from "react";
import moment from "moment";
import {
  ReviewContainer,
  TitleContainer,
  TextLeft,
  ExhibitUserContainer,
  FlexAndStart,
  MarginLeftDiv,
  CreatedAtContainer,
} from "./review.styles";
import SplitNewLine from "../split-new-line/split-new-line.component";
import DisplayStars from "../display-stars/display-stars.component";
import DisplayUserImage from "../display-user-image/display-user-image.component";

const Review = ({ review }) => (
  <ReviewContainer>
    <DisplayUserImage image_pass={review.user.avatar} />
    <MarginLeftDiv>
      <ExhibitUserContainer>
        投稿者: {review.user.username}
      </ExhibitUserContainer>
      <TitleContainer>{review.title}</TitleContainer>
      <FlexAndStart>
        <DisplayStars value={review.stars} isEdit={false} />
        <CreatedAtContainer>
          {moment(parseInt(review.createdAt)).fromNow()}
        </CreatedAtContainer>
      </FlexAndStart>
      <TextLeft>
        <SplitNewLine>{review.content}</SplitNewLine>
      </TextLeft>
    </MarginLeftDiv>
  </ReviewContainer>
);

export default Review;
