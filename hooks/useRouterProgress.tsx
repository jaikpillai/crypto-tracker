import { useState } from "react";

export const useRouterProgress = () => {
  const [animating, setIsAnimating] = useState(false);
  return { animating, setIsAnimating };
};
