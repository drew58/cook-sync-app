import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./SplashScreen";

const Index = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
    const seen = localStorage.getItem("reseepe_onboarded");
    if (!seen) {
      navigate("/onboarding", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  };

  return (
    <AnimatePresence>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
    </AnimatePresence>
  );
};

export default Index;
