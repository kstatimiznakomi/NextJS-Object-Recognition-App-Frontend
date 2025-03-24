"use client";
import { Modes } from "@/constants/common-objects";
import { FilesLoaderC } from "@/pages/FilesLoaderC";
import { useState } from "react";

export default function ObjectRecognition() {
  const [mode, setMode] = useState(localStorage.getItem("detectMode"));

  const showCompsByMode = () => {
    switch (localStorage.getItem("detectMode")) {
      case Modes.Image: {
        return <FilesLoaderC />;
      }
    }
  };

  const fixMode = (mode: string) => {
    localStorage.setItem("detectMode", mode);
    setMode(mode);
  };

  return (
    <>
      <div className={"flex justify-center mt-2"}>
        <div className={"max-w-fit"}>
          <div className={"gap-2 flex-wrap mt-2 justify-center flex mb-3"}>
            {Object.values(Modes).map((item) =>
              item === mode ? (
                <span
                  onClick={() => fixMode(item.toString())}
                  className={
                    "active select-none rounded-[14px] bg-white px-5 py-2"
                  }
                  key={item}
                >
                  {item}
                </span>
              ) : (
                <span
                  onClick={() => fixMode(item)}
                  className={
                    "passive select-none rounded-[14px] bg-white cursor-pointer px-5 py-2"
                  }
                  key={item}
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
      {showCompsByMode()}
    </>
  );
}
