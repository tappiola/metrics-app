import { ForwardedRef, forwardRef } from "react";
import { InputHTMLAttributes } from "react";
import classnames from "classnames";
import "./Input.css";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: "text" | "email" | "password" | "checkbox" | "hidden";
  errorMessage?: string;
  label: string;
}

const Input = forwardRef(
  (
    { id, label, errorMessage, className, ...inputProps }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div
        className={classnames(
          "input-wrapper",
          `input-wrapper--${inputProps.type || "text"}`,
          className,
        )}
      >
        <label htmlFor={id}>{label}</label>
        <input
          className={classnames("input", { "input--invalid": errorMessage })}
          ref={ref}
          id={id}
          {...inputProps}
        />
        {errorMessage && (
          <small className="input__error-message">{errorMessage}</small>
        )}
      </div>
    );
  },
);

export default Input;
