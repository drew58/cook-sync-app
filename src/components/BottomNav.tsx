import { Home, Search, PlusCircle, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCreator } = useAuth();

  if (location.pathname === "/" || location.pathname === "/index" || location.pathname === "/onboarding" || location.pathname === "/auth") return null;

  const tabs = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Search", path: "/search" },
    ...(isCreator ? [{ icon: PlusCircle, label: "Create", path: "/create" }] : []),
    { icon: Users, label: "Subs", path: "/subscriptions" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/50 pb-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const isCreate = tab.label === "Create";
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isCreate
                  ? "relative -mt-4"
                  : isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isCreate ? (
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <tab.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              ) : (
                <tab.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              )}
              <span className={`text-[10px] ${isCreate ? "mt-0.5" : ""} ${isActive ? "font-semibold" : "font-medium"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
