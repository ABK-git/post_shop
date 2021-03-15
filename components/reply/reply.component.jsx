import React from "react";
import { ReplyUser, ReplyContainer, Content, TextGray } from "./reply.styles";
import moment from "moment";
import SplitNewLine from "../split-new-line/split-new-line.component";
import DisplayUserImage from "../display-user-image/display-user-image.component";

const Reply = ({ reply }) => (
  <ReplyContainer>
    <DisplayUserImage image_pass={reply.user.avatar} />
    <Content>
      <ReplyUser>{reply.user.username}</ReplyUser>
      <TextGray>{moment(parseInt(reply.createdAt)).fromNow()}</TextGray>
      <SplitNewLine>{reply.content}</SplitNewLine>
    </Content>
  </ReplyContainer>
);

export default Reply;
