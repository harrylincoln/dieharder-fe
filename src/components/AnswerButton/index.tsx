import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-family: "BenchNine", sans-serif;
  border-width: 0.3rem;
  font-size: 3rem;
  min-width: 2rem;
  background: #364d59;
  color: #a2c8dd;
  border-right-color: white;
  border-top-color: white;
  border-left-color: #506c83;
  border-bottom-color: #506c83;
  margin: 0 0.25rem 0.25rem 0.25rem;
  cursor: pointer;
  transition: background-color 50ms linear;
  &:focus {
    color: black;
    background: aqua;
    border-left-color: white;
    border-bottom-color: white;
  }
`;

const AnswerButton = ({ text }: { text: string }) => {
  return <StyledButton>{text}</StyledButton>;
};

export default AnswerButton;
