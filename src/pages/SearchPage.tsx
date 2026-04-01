import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, DollarSign, ChefHat, Flame } from "lucide-react";
import { motion } from "framer-motion";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food5 from "@/assets/food-5.jpg";
import food6 from "@/assets/food-6.jpg";

const categories = ["All", "Nigerian", "Italian", "Asian", "Mexican", "Desserts", "Healthy"];

const results = [
  { id: 1, image: food1, name: "Jollof Rice", creator: "Chef Ada", time: "30 min", cost: "$5", difficulty: "Easy", ingredients: 8 },
  { id: 2, image: food2, name: "Pasta Carbonara", creator: "Marco", time: "20 min", cost: "$7", difficulty: "Medium", ingredients: 5 },
  { id: 3, image: food5, name: "Street Tacos", creator: "Carlos", time: "25 min", cost: "$6", difficulty: "Easy", ingredients: 7 },
  { id: 4, image: food6, name: "Smoothie Bowls", creator: "Priya", time: "10 min", cost: "$4", difficulty: "Easy", ingredients: 4 },
  { id: 5, image: food3, name: "Poke Bowl", creator: "Yuki", time: "15 min", cost: "$9", difficulty: "Easy", ingredients: 6 },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"meal" | "ingredients">("meal");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 pt-12 px-4">
      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === "meal" ? "Search for a dish..." : "Enter ingredients (e.g. rice, eggs, pepper)"}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setMode("meal")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "meal" ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-secondary text-foreground"
          }`}
        >
          Search by Meal
        </button>
        <button
          onClick={() => setMode("ingredients")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "ingredients" ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-secondary text-foreground"
          }`}
        >
          By Ingredients
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat ? "bg-foreground text-background" : "bg-secondary text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {results.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-3 flex gap-3 cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => navigate("/recipe/1")}
          >
            <img src={r.image} alt={r.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" loading="lazy" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-foreground">{r.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">by {r.creator}</p>
              <div className="flex gap-3 mt-2">
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3" /> {r.time}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <DollarSign className="w-3 h-3" /> {r.cost}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <ChefHat className="w-3 h-3" /> {r.ingredients} items
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Flame className="w-3 h-3" /> {r.difficulty}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
