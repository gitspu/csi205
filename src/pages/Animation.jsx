import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const Animation = () => {

  const fieldWidth = 720;
  const fieldHeight = 400;
  const ballDiameter = 80;
  const maxX = fieldWidth - ballDiameter - 2;
  const maxY = fieldHeight - ballDiameter - 2;


  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState("None");

  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {

        setX((prevX) => {
          let newX = prevX + (goRight ? 5 : -5);
          if (newX >= maxX) {
            setGoRight(false);
            newX = maxX;
          } else if (newX <= 0) {
            setGoRight(true);
            newX = 0;
          }
          return newX;
        });

        setY((prevY) => {
          let newY = prevY + (goDown ? 5 : -5);
          if (newY >= maxY) {
            setGoDown(false);
            newY = maxY;
          } else if (newY <= 0) {
            setGoDown(true);
            newY = 0;
          }
          return newY;
        });
      }, 20);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, goRight, goDown, maxX, maxY]);

  const toggleRun = () => setRunning((r) => !r);
  const selectBall = (name) => setSelected(name);

  const ballStyle = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    width: `${ballDiameter}px`,
    height: `${ballDiameter}px`,
    borderRadius: "50%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    backgroundColor: selected === "None" ? "#050505bb" : "transparent",
    backgroundImage:
      selected === "Basketball"
        ? "url(./Imgpic/bas.webp)"
        : selected === "Football"
        ? "url(./Imgpic/football.png)"
        : selected === "Volleyball"
        ? "url(./Imgpic/volleyball.png)"
        : selected === "Human"
        ? "url(./Imgpic/stdempimg.jpg)"
        : selected === "Cartoon"
        ? "url(./Imgpic/starsavior.png)"
        : "none",
  };

  const buttons = [
    "None",
    "Basketball",
    "Football",
    "Volleyball",
    "Human",
    "Cartoon",
  ];

  return (
      <div className="container p-5">
        <h2 className="text-center mb-4">ANIMATION PAGE</h2>
        <div
          id="field"
          className="anim-field position-relative border border-3 border-secondary rounded-5 mx-auto mb-5 "
          style={{ width: fieldWidth, height: fieldHeight, overflow: "hidden" }}
        >
          <div id="ball" style={ballStyle}></div>
        </div>

        <div className="anim-control d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 p-4">
          <button
            id="run"
            onClick={toggleRun}
            className={`btn btn-lg ${
              running ? "btn-danger" : "btn-success"
            } text-uppercase fw-bold rounded-3 shadow-lg`}
            style={{ width: "160px", height: "55px" }}
          >
            <i
              className={`bi ${
                running ? "bi-pause-circle-fill" : "bi-play-circle-fill"
              }`}
            ></i>
            &nbsp;
            {running ? "PAUSE" : "START"}
          </button>

          <div className="d-flex flex-wrap justify-content-center gap-2">
            {buttons.map((name) => (
              <button
                key={name}
                className={`btn btn-sm text-capitalize rounded-pill fw-medium ${
                  selected === name
                    ? "btn-primary shadow-lg"
                    : "btn-outline-dark"
                }`}
                onClick={() => selectBall(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Animation;