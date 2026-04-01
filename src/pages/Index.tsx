import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has seen onboarding
    const seen = localStorage.getItem("reseepe_onboarded");
    if (!seen) {
      navigate("/onboarding", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return null;
};

export default Index;
