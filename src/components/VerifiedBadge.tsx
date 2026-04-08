import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  size?: "sm" | "md";
}

const VerifiedBadge = ({ size = "sm" }: VerifiedBadgeProps) => {
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return <BadgeCheck className={`${sizeClass} text-primary fill-primary/20`} />;
};

export default VerifiedBadge;
