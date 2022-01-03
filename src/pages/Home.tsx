import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as Logo } from "../logo2.svg";

const LogoContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  svg {
    max-width: 100%;
    @media (min-width: 768px) {
      max-width: 60%;
    }
  }

  h1 {
    bottom: 5rem;
    text-decoration: none !important;
    position: relative;
    font-size: 1.5rem;
    line-height: 1.5rem;
    color: white;
    @media (min-width: 470px) {
      bottom: 7.5rem;
      font-size: 2rem;
      line-height: 2rem;
    }
    @media (min-width: 768px) {
      bottom: 7rem;
    }

    @media (min-width: 1024px) {
      font-size: 2.5rem;
      bottom: 8rem;
    }
  }
`;

const Home = () => (
  <div
    style={{
      background:
        "radial-gradient(ellipse at center, #29382c 0%, #0c100d 100%)",
    }}
  >
    <div className="noise-wrapper" style={{ position: "absolute" }}>
      <LogoContainer>
        <Link to="/directory" style={{ width: "100%" }}>
          <Logo />
        </Link>
        <h1>
          NAKATOMI <br />
          PLAZA
        </h1>
      </LogoContainer>
      <div className="noise"></div>
    </div>
  </div>
);

export default Home;
