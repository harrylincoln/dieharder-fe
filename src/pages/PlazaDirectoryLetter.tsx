import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TouchScreenButton from "../components/TouchScreenButton";
import { names } from "../names";

const PlazaDirectoryLetter = () => {
  const { letter } = useParams<Record<string, string | undefined>>();

  const [navigatableSet, changeNavigatableSet] = useState({
    names: names[letter as typeof names].screens[0].names,
    set: 0,
    hasSecondset: !!names[letter as typeof names].screens[1],
  });

  const switchSet = () => {
    changeNavigatableSet({
      ...navigatableSet,
      ...(navigatableSet.set === 0 && {
        set: 1,
        names: names[letter as typeof names].screens[1].names,
      }),
      ...(navigatableSet.set === 1 && {
        set: 0,
        names: names[letter as typeof names].screens[0].names,
      }),
    });
  };

  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse at center, #29382c 0%, #0c100d 100%)",
      }}
    >
      <div className="noise-wrapper">
        <div style={{ position: "relative" }}>
          <h1>Nakatomi Plaza Directory</h1>
          <h2>TOUCH PERSON'S NAME FOR LOCATOR MAP</h2>
          {navigatableSet.names &&
            navigatableSet.names.map((name: string) => (
              <TouchScreenButton
                text={name}
                namesStyle
                isHolly={name === "GENNARO, HOLLY"}
              />
            ))}
          <div>
            {navigatableSet.hasSecondset && (
              <TouchScreenButton
                text={navigatableSet.set === 0 ? "Next screen" : "Prev screen"}
                onClick={switchSet}
              />
            )}
            <TouchScreenButton text={"Exit"} href={"/directory"} />
          </div>
          <div className="noise"></div>
        </div>
      </div>
    </div>
  );
};

export default PlazaDirectoryLetter;
