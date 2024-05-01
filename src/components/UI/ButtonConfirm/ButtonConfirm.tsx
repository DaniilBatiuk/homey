import React from "react";

import "./ButtonConfirm.scss";

export interface ButtonConfirmProps extends React.ComponentProps<"button"> {
  type?: "button" | "submit";
  text: string;
}

export const ButtonConfirm: React.FC<ButtonConfirmProps> = ({
  type = "button",
  text,
  ...props
}: ButtonConfirmProps) => {
  return (
    <button type={type} className="button-confirm" {...props}>
      {text}
    </button>
  );
};
