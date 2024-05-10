import React, { ButtonHTMLAttributes, ReactNode } from "react";

import { ICONS } from "@/constants";

import styles from "./ErrorButton.module.scss";

type ErrorButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  type?: "button" | "submit";
  colorBorder?: string;
  colorHover?: string;
};

export const ErrorButton: React.FC<ErrorButtonProps> = ({
  children,
  colorBorder,
  colorHover,
  ...props
}: ErrorButtonProps) => {
  return (
    <button className={`${styles.button}`} {...props} style={{ borderColor: colorBorder }}>
      <style>{`
    .${styles.button}:before {
      background-color: ${colorHover};
    }
  `}</style>
      <div className={`${styles.button_text}`}>
        <style>{`
          .${styles.button_text}:before {
            background-color: ${colorHover};
          }
        `}</style>
        {children}
      </div>
      <div className={`${styles.button_arrow}`} style={{ backgroundColor: colorHover }}>
        {ICONS.button()}
      </div>
    </button>
  );
};
