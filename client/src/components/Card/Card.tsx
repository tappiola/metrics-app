import classnames from "classnames";
import "./Card.css";
import { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div className={classnames("card", className)} data-cy="card">
      {children}
    </div>
  );
};

export default Card;
