import { forwardRef, ReactNode } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  {
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
  }
>(({ onClick, children, type = "button", className, ...rest }, ref) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
});
