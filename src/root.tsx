import { FC, useState } from "react";

type Props = HTMLElement & {
  str?: string;
};

const Test: FC<Props> = ({ children, str, ...restProps }: Props) => {
  console.log("restProps", restProps);
  const [state, setState] = useState<number>(0);
  return (
    <>
      This is LIB!! {str}
      <>{children}</>
      <div>{state}</div>
      <button onClick={() => setState((prev) => prev + 1)}></button>
    </>
  );
};
export default Test;
