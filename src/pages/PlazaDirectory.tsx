import React from "react";
import TouchScreenButton from "../components/TouchScreenButton";

const PlazaDirectoryLetter = () => (
  <>
    <h1>Nakatomi Plaza Directory</h1>
    <h2>Touch key with first letter of person's last name</h2>
    {[
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ].map((letter: string) => (
      <TouchScreenButton text={letter} href={`/directory/${letter}`} />
    ))}
  </>
);

export default PlazaDirectoryLetter;
