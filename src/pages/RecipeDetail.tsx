import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Bookmark, Share2, Clock, DollarSign, ChefHat, Users } from "lucide-react";
import { motion } from "framer-motion";
import food1 from "@/assets/food-1.jpg";

const ingredients = [
  { name: "Long grain rice", amount: "2 cups", have: true },
  { name: "Tomatoes", amount: "4 large", have: true },
  { name: "Red bell pepper", amount: "2", have: false },
  { name: "Scotch bonnet", amount: "3", have: true },
  { name: "Onion", amount: "1 large", have: true },
  { name: "Chicken", amount: "500g", have: false },
  { name: "Vegetable oil", amount: "3 tbsp", have: true },
  { name: "Seasoning", amount: "to taste", have: true },
];

const steps = [
  "Blend tomatoes, pepper, and scotch bonnet into a smooth paste.",
  "Heat oil in a large pot and fry onions until golden.",
  "Pour in the blended tomato paste and cook for 20 minutes.",
  "Add seasoning, salt, and stock cubes. Stir well.",
  "Wash rice and add to the pot. Mix thoroughly.",
  "Add water to cover the rice, reduce heat, and cover tightly.",
  "Cook for 30 minutes until rice is tender and fluffy.",
  "Serve with grilled chicken and enjoy!",
];

const RecipeDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ingredients" | "steps" | "alternatives">("ingredients");
  const [minimalMode, setMinimalMode] = useState(false);
  const [liked, setLiked] = useState(false);

  const displayIngredients = minimalMode ? ingredients.filter((i) => i.have) : ingredients;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Video/Image */}
      <div className="relative h-[45vh]">
        <img src={food1} alt="Jollof Rice" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-foreground/20" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="absolute top-12 right-4 flex gap-2">
          <button onClick={() => setLiked(!liked)} className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <Heart className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : "text-foreground"}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-foreground" />
          </button>
          <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="px-5 -mt-8 relative z-10">
        <div className="glass-card p-5">
          <h1 className="text-xl font-bold font-display text-foreground">Smoky Jollof Rice</h1>
          <p className="text-sm text-muted-foreground mt-1">by Chef Ada • 2.4k likes</p>

          {/* Stats */}
          <div className="flex gap-4 mt-4">
            {[
              { icon: Clock, label: "30 min" },
              { icon: DollarSign, label: "$5" },
              { icon: ChefHat, label: "Easy" },
              { icon: Users, label: "4 servings" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-light-orange flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-5 bg-secondary rounded-2xl p-1">
          {(["ingredients", "steps", "alternatives"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-4">
          {activeTab === "ingredients" && (
            <div>
              {/* Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-foreground">
                  {minimalMode ? "Use what I have" : "Full recipe"}
                </span>
                <button
                  onClick={() => setMinimalMode(!minimalMode)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${minimalMode ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-card shadow absolute top-0.5 transition-transform ${minimalMode ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="space-y-2.5">
                {displayIngredients.map((ing) => (
                  <div key={ing.name} className="flex items-center justify-between py-2 px-3 rounded-xl bg-card border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${ing.have ? "border-green-500 bg-green-50" : "border-border"}`}>
                        {ing.have && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                      </div>
                      <span className="text-sm text-foreground">{ing.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{ing.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "steps" && (
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "alternatives" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-3">Don't have an ingredient? Try these substitutions:</p>
              {[
                { original: "Red bell pepper", alt: "Green bell pepper or paprika" },
                { original: "Chicken", alt: "Turkey, tofu, or skip for vegetarian" },
                { original: "Scotch bonnet", alt: "Habanero or cayenne pepper" },
              ].map((sub) => (
                <div key={sub.original} className="p-3 rounded-xl bg-light-orange border border-primary/10">
                  <p className="text-sm font-semibold text-foreground">{sub.original}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">→ {sub.alt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RecipeDetail;
