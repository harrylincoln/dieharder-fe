import React from "react";
import TouchScreenButton from "../components/TouchScreenButton";

const PlazaDirectoryLetter = () => (
  <>
    <h1>Nakatomi Plaza Directory</h1>
    <h3>TOUCH KEY WITH FIRST LETTER OF PERSON'S LAST NAME</h3>
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
