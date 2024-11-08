import { ReactNode } from "react";

export function Button({
  onClick,
  children,
  type,
  ...props
}: {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  type?: string;
}) {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
}
