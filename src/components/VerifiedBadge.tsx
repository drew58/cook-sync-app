import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  size?: "sm" | "md";
  className?: string;
}

// Reseepe green verified badge (matches the green letters in the logo)
const VerifiedBadge = ({ size = "sm", className = "" }: VerifiedBadgeProps) => {
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return (
    <BadgeCheck
      className={`${sizeClass} ${className}`}
      style={{ color: "hsl(142 50% 45%)", fill: "hsl(142 50% 45% / 0.18)" }}
    />
  );
};

export default VerifiedBadge;
