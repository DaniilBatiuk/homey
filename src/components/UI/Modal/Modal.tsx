import React from "react";

import "./Modal.scss";

export interface ModalProps {
  active: boolean;
  children: React.ReactNode;
  maxDivWidth: string;
  setActive: (value: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
  active,
  children,
  maxDivWidth,
  setActive,
}: ModalProps) => {
  return (
    <section className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div
        className={active ? "modal__content active" : "modal__content"}
        style={{ maxWidth: maxDivWidth }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </section>
  );
};
