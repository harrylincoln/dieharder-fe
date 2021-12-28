import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../logo2.svg";

const Home = () => (
  <>
    <Logo />
    <h1>
      NAKATOMI <br />
      PLAZA
    </h1>

    <Link to="/directory">TOUCH SCREEN TO START DIRECTORY</Link>
  </>
);

export default Home;
