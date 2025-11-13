import RadixCounter from "../components/RadixCounter";
import Value from "../components/Value";
import Adder from "../components/Adder";
import Timer from "../components/Timer";
import Temperature from "../components/Temperature";
import { useState } from "react";

const Components = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">COMPONENTS PAGE</h2>

      <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
        <RadixCounter />
        <Value name={"COUNTER"} value={counter} setValue={setCounter} />
        <Adder />
        <Timer />
        <Temperature />
      </div>
    </div>
  );
};

export default Components;
