import React from "react";
import { MtContainer } from "./split-new-line.styles";

const SplitNewLine = ({ children }) => {
  let lines = [];
  if (children.includes("\n")) {
    lines = children.split("\n");
  } else {
    lines.push(children);
  }
  return (
    <MtContainer>
      {lines.length && lines.map((line, index) => {
        if(line){
          return <p key={index}>{line}</p>
        }else{
          return <br key={index}/>
        }
      })}
    </MtContainer>
  );
};

export default SplitNewLine;
