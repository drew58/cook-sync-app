import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Sparkles, Users, Wallet } from "lucide-react";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";

const slides = [
  {
    title: "Discover what\nto cook instantly",
    subtitle: "Scroll through delicious short videos and find your next meal in seconds",
    icon: Sparkles,
    image: food1,
  },
  {
    title: "Cook with what\nyou already have",
    subtitle: "Input your ingredients and we'll suggest recipes you can make right now",
    icon: ChefHat,
    image: food2,
  },
  {
    title: "Learn from real\nfood creators",
    subtitle: "Watch chefs and home cooks share their best recipes and techniques",
    icon: Users,
    image: food3,
  },
  {
    title: "Choose recipes\nthat fit your budget",
    subtitle: "Compare costs and find affordable meals without compromising on taste",
    icon: Wallet,
    image: food4,
  },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex flex-col"
        >
          {/* Image */}
          <div className="relative h-[55vh] overflow-hidden">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover"
              width={640}
              height={960}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
            {/* Skip */}
            <button
              onClick={() => navigate("/auth")}
              className="absolute top-12 right-5 text-primary-foreground/80 text-sm font-medium bg-foreground/20 backdrop-blur-md px-4 py-1.5 rounded-full"
            >
              Skip
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-8 pt-4 pb-8 flex flex-col">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-light-orange flex items-center justify-center mb-4">
                {(() => {
                  const Icon = slides[current].icon;
                  return <Icon className="w-6 h-6 text-primary" />;
                })()}
              </div>
              <h1 className="text-3xl font-bold font-display leading-tight whitespace-pre-line text-foreground">
                {slides[current].title}
              </h1>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom controls */}
      <div className="px-8 pb-10 flex items-center justify-between">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
        {/* CTA */}
        <button
          onClick={next}
          className="bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-primary/25 active:scale-95 transition-transform"
        >
          {current === slides.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
