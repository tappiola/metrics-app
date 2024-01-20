import { ForwardedRef, forwardRef } from "react";
import { InputHTMLAttributes } from "react";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: "text" | "email" | "password" | "checkbox" | "hidden";
  errorMessage?: string;
  label: string;
}

const Input = forwardRef(
  (
    { id, label, errorMessage, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input ref={ref} id={id} {...rest} />
        {errorMessage && <small>{errorMessage}</small>}
      </div>
    );
  },
);

export default Input;
