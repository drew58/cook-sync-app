import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, DollarSign, ChefHat, Flame, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food5 from "@/assets/food-5.jpg";
import food6 from "@/assets/food-6.jpg";

const categories = ["All", "Nigerian", "Italian", "Asian", "Mexican", "Desserts", "Healthy"];

const allIngredients = [
  "Rice", "Eggs", "Chicken", "Pepper", "Onion", "Tomato", "Garlic",
  "Pasta", "Cheese", "Butter", "Olive Oil", "Salt", "Sugar", "Flour",
  "Milk", "Salmon", "Avocado", "Lemon", "Ginger", "Soy Sauce",
  "Tortilla", "Beans", "Corn", "Cilantro", "Lime",
];

const results = [
  { id: 1, image: food1, name: "Jollof Rice", creator: "Chef Ada", time: "30 min", cost: "$5", difficulty: "Easy", ingredients: 8 },
  { id: 2, image: food2, name: "Pasta Carbonara", creator: "Marco", time: "20 min", cost: "$7", difficulty: "Medium", ingredients: 5 },
  { id: 3, image: food5, name: "Street Tacos", creator: "Carlos", time: "25 min", cost: "$6", difficulty: "Easy", ingredients: 7 },
  { id: 4, image: food6, name: "Smoothie Bowls", creator: "Priya", time: "10 min", cost: "$4", difficulty: "Easy", ingredients: 4 },
  { id: 5, image: food3, name: "Poke Bowl", creator: "Yuki", time: "15 min", cost: "$9", difficulty: "Easy", ingredients: 6 },
];

const aiSuggestions = [
  { id: 10, image: food1, name: "Egg Fried Rice", creator: "Chef Ada", time: "15 min", cost: "$3", difficulty: "Easy", ingredients: 4, match: "95%" },
  { id: 11, image: food2, name: "Chicken Stir Fry", creator: "Marco", time: "20 min", cost: "$6", difficulty: "Easy", ingredients: 5, match: "88%" },
  { id: 12, image: food5, name: "Tomato Egg Drop Soup", creator: "Yuki", time: "10 min", cost: "$2", difficulty: "Easy", ingredients: 3, match: "92%" },
  { id: 13, image: food6, name: "Pepper Omelette", creator: "Priya", time: "8 min", cost: "$2", difficulty: "Easy", ingredients: 3, match: "97%" },
  { id: 14, image: food3, name: "Garlic Butter Rice", creator: "Carlos", time: "12 min", cost: "$3", difficulty: "Easy", ingredients: 4, match: "90%" },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"meal" | "ingredients">("meal");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [showAiResults, setShowAiResults] = useState(false);
  const navigate = useNavigate();

  const filteredIngredients = allIngredients.filter((ing) =>
    ing.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  const toggleIngredient = (ing: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
    setShowAiResults(false);
  };

  const removeIngredient = (ing: string) => {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ing));
    setShowAiResults(false);
  };

  const handleAiSearch = () => {
    if (selectedIngredients.length > 0) {
      setShowAiResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-12 px-4">
      {/* Mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setMode("meal"); setShowAiResults(false); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "meal" ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-secondary text-foreground"
          }`}
        >
          Search by Meal
        </button>
        <button
          onClick={() => { setMode("ingredients"); setShowAiResults(false); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "ingredients" ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-secondary text-foreground"
          }`}
        >
          By Ingredients
        </button>
      </div>

      {mode === "meal" ? (
        <>
          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a dish..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
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
        </>
      ) : (
        <>
          {/* Ingredient search */}
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={ingredientSearch}
              onChange={(e) => setIngredientSearch(e.target.value)}
              placeholder="Search ingredients..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Selected ingredients */}
          <AnimatePresence>
            {selectedIngredients.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-3 overflow-hidden"
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selectedIngredients.map((ing) => (
                    <span
                      key={ing}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold"
                    >
                      {ing}
                      <button onClick={() => removeIngredient(ing)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleAiSearch}
                  className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
                >
                  <Sparkles className="w-4 h-4" />
                  Find Recipes with {selectedIngredients.length} ingredient{selectedIngredients.length > 1 ? "s" : ""}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Results */}
          <AnimatePresence>
            {showAiResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-bold text-foreground">AI Suggestions</h2>
                  <span className="text-[10px] text-muted-foreground">Based on your ingredients</span>
                </div>
                <div className="space-y-3">
                  {aiSuggestions.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="glass-card p-3 flex gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                      onClick={() => navigate("/recipe/1")}
                    >
                      <div className="relative">
                        <img src={r.image} alt={r.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" loading="lazy" />
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          {r.match}
                        </span>
                      </div>
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
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ingredient checklist */}
          {!showAiResults && (
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-foreground mb-2">Select your ingredients</h2>
              {filteredIngredients.map((ing, i) => (
                <motion.label
                  key={ing}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors"
                >
                  <Checkbox
                    checked={selectedIngredients.includes(ing)}
                    onCheckedChange={() => toggleIngredient(ing)}
                  />
                  <span className="text-sm text-foreground">{ing}</span>
                </motion.label>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
