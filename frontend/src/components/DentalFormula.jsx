import React from "react";
import Tooth from "./Tooth";
import jaws from "../assets/jaws.svg";
import tooth11 from "../assets/teeth/tooth11.svg";
import tooth11b from "../assets/teeth/tooth11b.svg";
import tooth12 from "../assets/teeth/tooth12.svg";
import tooth12b from "../assets/teeth/tooth12b.svg";
import tooth13 from "../assets/teeth/tooth13.svg";
import tooth13b from "../assets/teeth/tooth13b.svg";
import tooth14 from "../assets/teeth/tooth14.svg";
import tooth14b from "../assets/teeth/tooth14b.svg";
import tooth15 from "../assets/teeth/tooth15.svg";
import tooth15b from "../assets/teeth/tooth15b.svg";
import tooth16 from "../assets/teeth/tooth16.svg";
import tooth16b from "../assets/teeth/tooth16b.svg";
import tooth17 from "../assets/teeth/tooth17.svg";
import tooth17b from "../assets/teeth/tooth17b.svg";
import tooth18 from "../assets/teeth/tooth18.svg";
import tooth18b from "../assets/teeth/tooth18b.svg";
import tooth41 from "../assets/teeth/tooth41.svg";
import tooth41b from "../assets/teeth/tooth41b.svg";
import tooth42 from "../assets/teeth/tooth42.svg";
import tooth42b from "../assets/teeth/tooth42b.svg";
import tooth43 from "../assets/teeth/tooth43.svg";
import tooth43b from "../assets/teeth/tooth43b.svg";
import tooth44 from "../assets/teeth/tooth44.svg";
import tooth44b from "../assets/teeth/tooth44b.svg";
import tooth45 from "../assets/teeth/tooth45.svg";
import tooth45b from "../assets/teeth/tooth45b.svg";
import tooth46 from "../assets/teeth/tooth46.svg";
import tooth46b from "../assets/teeth/tooth46b.svg";
import tooth47 from "../assets/teeth/tooth47.svg";
import tooth47b from "../assets/teeth/tooth47b.svg";
import tooth48 from "../assets/teeth/tooth48.svg";
import tooth48b from "../assets/teeth/tooth48b.svg";

//экспорт зубов
export const toothImages = {
  1: { default: tooth11, selected: tooth11b },
  2: { default: tooth12, selected: tooth12b },
  3: { default: tooth13, selected: tooth13b },
  4: { default: tooth14, selected: tooth14b },
  5: { default: tooth15, selected: tooth15b },
  6: { default: tooth16, selected: tooth16b },
  7: { default: tooth17, selected: tooth17b },
  8: { default: tooth18, selected: tooth18b },
  9: { default: tooth11, selected: tooth11b },
  10: { default: tooth12, selected: tooth12b },
  11: { default: tooth13, selected: tooth13b },
  12: { default: tooth14, selected: tooth14b },
  13: { default: tooth15, selected: tooth15b },
  14: { default: tooth16, selected: tooth16b },
  15: { default: tooth17, selected: tooth17b },
  16: { default: tooth18, selected: tooth18b },
  17: { default: tooth41, selected: tooth41b },
  18: { default: tooth42, selected: tooth42b },
  19: { default: tooth43, selected: tooth43b },
  20: { default: tooth44, selected: tooth44b },
  21: { default: tooth45, selected: tooth45b },
  22: { default: tooth46, selected: tooth46b },
  23: { default: tooth47, selected: tooth47b },
  24: { default: tooth48, selected: tooth48b },
  25: { default: tooth41, selected: tooth41b },
  26: { default: tooth42, selected: tooth42b },
  27: { default: tooth43, selected: tooth43b },
  28: { default: tooth44, selected: tooth44b },
  29: { default: tooth45, selected: tooth45b },
  30: { default: tooth46, selected: tooth46b },
  31: { default: tooth47, selected: tooth47b },
  32: { default: tooth48, selected: tooth48b },
};

const DentalFormula = ({ handleUpdate, initialStatus }) => {
  const handleToothStatusChange = (id, newStatus, step) => {};

  //рендер зубов
  const renderTeethArch = (start, end, initialStatus) => {
    const teeth = [];
    for (let i = start; i <= end; i++) {
      teeth.push(
        <Tooth
          key={i}
          id={i}
          className="inline-block m-1"
          handleToothStatusChange={handleToothStatusChange}
          status={initialStatus[i]}
        />
      );
    }
    return teeth;
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/4 mb-4 lg:mb-0">
        <div className="space-y-4">
          {["Implant", "Crown", "Filling", "Extracted"].map((text, index) => (
            <button
              key={index}
              className="w-full py-2 px-4 rounded bg-white hover:bg-gray-100"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
      <div className="relative w-[400px] h-[300px]">
        <img
          className="w-[200px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src={jaws}
          alt="Jaws"
        />
        <div className="absolute top-0 left-0 right-0">
          {renderTeethArch(1, 16, initialStatus)}
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          {renderTeethArch(17, 32, initialStatus)}
        </div>
      </div>
      <div className="lg:w-3/4 p-4 rounded-xl border border-neutral-300">
        <h2 className="text-lg font-medium mb-4">
          Fill in patient's dental formula
        </h2>
        <p className="text-gray-600 mb-4">
          1 - Click on the buttons on the left to choose the right current
          status for the tooth or several teeth.
          <br />2 - Click on every tooth to change its status. You can choose
          several teeth at once to set the same status for them.
        </p>
        <button
          className="py-2 px-4 rounded-lg border border-neutral-300 mt-4 hover:bg-gray-100"
          onClick={handleUpdate}
        >
          Save Dental Formula
        </button>
      </div>
    </div>
  );
};

export default DentalFormula;
