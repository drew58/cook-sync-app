import { Check } from "lucide-react";

interface VerifiedBadgeProps {
  size?: "sm" | "md";
  className?: string;
}

// Reseepe green verified badge — solid green disc with bold white check
const VerifiedBadge = ({ size = "sm", className = "" }: VerifiedBadgeProps) => {
  const wrap = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const icon = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full shadow-sm ring-1 ring-white/70 ${wrap} ${className}`}
      style={{ backgroundColor: "hsl(142 65% 40%)" }}
      aria-label="Verified"
    >
      <Check className={`${icon} text-white`} strokeWidth={4} />
    </span>
  );
};

export default VerifiedBadge;
