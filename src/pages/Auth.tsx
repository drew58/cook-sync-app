import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChefHat, User, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"user" | "creator" | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 pt-14 pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-gradient">RESEEPE</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {isLogin ? "Welcome back! Sign in to continue" : "Create your account to get started"}
          </p>
        </div>

        {/* Role Selection (signup only) */}
        {!isLogin && (
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setRole("user")}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                role === "user" ? "border-primary bg-light-orange" : "border-border bg-card"
              }`}
            >
              <User className={`w-6 h-6 ${role === "user" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-semibold ${role === "user" ? "text-primary" : "text-foreground"}`}>
                I'm a User
              </span>
            </button>
            <button
              onClick={() => setRole("creator")}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                role === "creator" ? "border-primary bg-light-orange" : "border-border bg-card"
              }`}
            >
              <ChefHat className={`w-6 h-6 ${role === "creator" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-semibold ${role === "creator" ? "text-primary" : "text-foreground"}`}>
                Food Creator
              </span>
            </button>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-3.5 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3.5 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3.5 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-12"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isLogin && (
          <button className="text-primary text-sm font-medium mt-3 block ml-auto">Forgot password?</button>
        )}

        {/* Submit */}
        <button
          onClick={() => {
            localStorage.setItem("reseepe_onboarded", "true");
            navigate("/home", { replace: true });
          }}
          className="w-full mt-6 bg-primary text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
        >
          {isLogin ? "Sign In" : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 9.76A7.5 7.5 0 0 1 12 4.5c1.77 0 3.37.61 4.63 1.63l3.45-3.45A12.5 12.5 0 0 0 12 0 12 12 0 0 0 1.24 6.65l4.03 3.11Z"/><path fill="#34A853" d="M16.04 18.01A7.4 7.4 0 0 1 12 19.5a7.5 7.5 0 0 1-6.73-4.24l-4.03 3.11A12 12 0 0 0 12 24a11.5 11.5 0 0 0 7.84-3l-3.8-2.99Z"/><path fill="#4A90D9" d="M19.84 21a11.7 11.7 0 0 0 3.66-8.5c0-.83-.08-1.64-.24-2.5H12v5h4.34a5.2 5.2 0 0 1-2.3 2.99l3.8 3.01Z"/><path fill="#FBBC05" d="M5.27 15.26A7.5 7.5 0 0 1 4.5 12c0-1.14.27-2.21.77-3.24L1.24 5.65A12 12 0 0 0 0 12c0 2.17.56 4.22 1.57 6l3.7-2.74Z"/></svg>
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"/></svg>
            Apple
          </button>
        </div>

        {/* Toggle */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold">
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
