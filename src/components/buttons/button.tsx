import classNames from "classnames";
import React from "react";

enum ButtonStyle {
  PRIMARY = "bg-green-500 hover:bg-green-700 text-white border-green-500 hover:border-green-700 border-2",
  SECONDARY = "bg-transparent hover:bg-green-500 text-green-500 hover:text-white border-green-500 border-2",
}

interface ButtonProps {
  readonly buttonStyle: ButtonStyle;
  readonly onClick: () => void;
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const Button: React.FunctionComponent<ButtonProps> = ({
  buttonStyle,
  onClick: handleClick,
  children,
}) => (
  <button
    type="button"
    onClick={handleClick}
    className={classNames(
      "font-normal py-2 px-4 rounded transition-all",
      buttonStyle
    )}
  >
    {children}
  </button>
);

export default Button;
export { ButtonStyle };
