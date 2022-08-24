import { useEffect, useState } from "react";

interface IBar {
  animationDuration: number;
  progress: number;
}
export const Bar: React.FunctionComponent<IBar> = ({
  animationDuration,
  progress,
}) => {
  return (
    <div
      className="bg-primary-600 h-[3.2px] w-0 left-0 top-0 fixed z-50"
      style={{
        width: `${progress * 100}%`,
        transition: `width ${animationDuration}ms ease-in-out`,
      }}
    ></div>
  );
};
