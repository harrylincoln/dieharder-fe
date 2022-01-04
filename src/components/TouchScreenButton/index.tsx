import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button<{ visited: boolean; namesStyle?: boolean }>`
  font-family: "BenchNine", sans-serif;
  border-width: 0.3rem;
  font-size: 3rem;
  min-width: 2rem;
  background: ${(props) => (props.visited ? "aqua" : "#364d59")};
  color: ${(props) => (props.visited ? "black" : "#a2c8dd")};
  border-right-color: white;
  border-top-color: white;
  border-left-color: ${(props) => (props.visited ? "white" : "#506c83")};
  border-bottom-color: ${(props) => (props.visited ? "white" : "#506c83")};
  margin: 0 0.25rem 0.25rem 0.25rem;
  cursor: pointer;
  transition: background-color 50ms linear;
  width: ${(props) => (props.namesStyle ? "98%" : "auto")};
  @media (min-width: 768px) {
    display: inline-block;
    width: ${(props) => (props.namesStyle ? "47%" : "auto")};
  }
`;

const TouchScreenButton = ({
  text,
  href,
  namesStyle,
  isHolly,
  onClick,
  disabled,
}: {
  text: string;
  href?: string;
  namesStyle?: boolean;
  isHolly?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const navigate = useNavigate();
  const [visited, setVisited] = useState(false);

  const onPress = (event: React.MouseEvent<HTMLElement>) => {
    if (isHolly) {
      let audio = new Audio("/cute-toy.mp3");
      audio.play();
    }
    event.preventDefault();
    setVisited(true);
    setTimeout(() => {
      if (onClick) onClick();
      if (href) navigate(href);
      setVisited(false);
      if (isHolly) navigate("/quiz");
    }, 1000);
  };

  return (
    <StyledButton
      visited={visited}
      onClick={onPress}
      namesStyle={namesStyle}
      disabled={disabled ?? false}
    >
      {text}
    </StyledButton>
  );
};

export default TouchScreenButton;
