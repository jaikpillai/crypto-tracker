interface IContainer {
  animationDuration: number;
  children: React.ReactNode;
  isFinished: boolean;
}

export const ProgressContainer: React.FunctionComponent<IContainer> = ({
  animationDuration,
  children,
  isFinished,
}) => {
  return (
    <div
      className="pointer-events-none"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      {children}
    </div>
  );
};
