import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import PlazaDirectory from "./pages/PlazaDirectory";
import PlazaDirectoryLetter from "./pages/PlazaDirectoryLetter";

const App = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/directory" element={<PlazaDirectory />} />
        <Route path="/directory/:letter" element={<PlazaDirectoryLetter />} />
      </Routes>
    </div>
  );
};

export default App;
