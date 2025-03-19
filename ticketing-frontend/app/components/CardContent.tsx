import { ReactNode } from "react";

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export default function CardContent({ children, className }: CardContentProps) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
