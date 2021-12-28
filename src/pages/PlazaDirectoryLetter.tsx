import React from "react";
import { useParams } from "react-router-dom";
import TouchScreenButton from "../components/TouchScreenButton";
import { names } from "../names";

const PlazaDirectoryLetter = () => {
  const { letter } = useParams();

  return (
    <>
      <h1>Nakatomi Plaza Directory</h1>
      <h2>Touch person's name for locator map</h2>
      {
        // @ts-ignore
        names[letter].screens.map((screen: any) => (
          <>
            {screen.names.map((name: string) => (
              <TouchScreenButton
                text={name}
                namesStyle
                isHolly={name === "GENNARO, HOLLY"}
              />
            ))}
          </>
        ))
      }
      <div>
        <TouchScreenButton text={"Exit"} href={"/directory"} />
      </div>
    </>
  );
};

export default PlazaDirectoryLetter;
