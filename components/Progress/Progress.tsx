import { useNProgress } from "@tanem/react-nprogress";
import { useEffect } from "react";
import { Bar } from "./Bar";
import { ProgressContainer } from "./Container";

export const Progress: React.FunctionComponent<{ isAnimating: boolean }> = ({
  isAnimating,
}) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <ProgressContainer
      animationDuration={animationDuration}
      isFinished={isFinished}
    >
      <Bar animationDuration={animationDuration} progress={progress} />
    </ProgressContainer>
  );
};
