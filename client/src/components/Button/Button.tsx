import { ButtonHTMLAttributes, ReactNode } from "react";
import classnames from "classnames";
import "./Button.css";
export enum ButtonVariant {
  Primary = "Primary",
  Secondary = "Secondary",
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  children: ReactNode;
}
const Button = ({
  variant = ButtonVariant.Primary,
  className,
  children,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={classnames("button", className, {
        "button--primary": variant === ButtonVariant.Primary,
        "button--secondary": variant === ButtonVariant.Secondary,
      })}
      data-cy="button"
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
