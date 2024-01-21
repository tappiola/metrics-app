import classnames from "classnames";
import { ModalProps } from "./Modal.types";
import "./Modal.css";
import { createRef, useEffect } from "react";

const Modal = ({ children, id, onCancel, className }: ModalProps) => {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel, ref]);

  return (
    <>
      <div className="modal__backdrop" />

      <div id={id} ref={ref} className={classnames("modal", className)}>
        {children}
      </div>
    </>
  );
};

export default Modal;
