import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Bookmark, Share2, Clock, DollarSign, ChefHat, Users, MessageCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import food1 from "@/assets/food-1.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { persistLike, persistSave } from "@/lib/recipeActions";
import { toast } from "sonner";
import CommentsSheet from "@/components/CommentsSheet";
import ShareSheet from "@/components/ShareSheet";

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
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [activeTab, setActiveTab] = useState<"ingredients" | "steps" | "alternatives">("ingredients");
  const [minimalMode, setMinimalMode] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase.from("recipes").select("*").eq("id", id).maybeSingle();
      setRecipe(data);
      setLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    if (!user || !id) return;
    (async () => {
      const [{ data: like }, { data: save }] = await Promise.all([
        supabase.from("likes").select("id").eq("user_id", user.id).eq("recipe_id", id).maybeSingle(),
        supabase.from("saves").select("id").eq("user_id", user.id).eq("recipe_id", id).maybeSingle(),
      ]);
      setLiked(!!like);
      setSaved(!!save);
    })();
  }, [user, id]);

  const toggleLike = async () => {
    if (!user || !id) return navigate("/auth");
    const next = !liked;
    setLiked(next);
    setRecipe((r: any) => r ? { ...r, like_count: Math.max(0, (r.like_count || 0) + (next ? 1 : -1)) } : r);
    const { error } = await persistLike(user.id, id, next);
    if (error) {
      setLiked(!next);
      setRecipe((r: any) => r ? { ...r, like_count: Math.max(0, (r.like_count || 0) + (next ? -1 : 1)) } : r);
      toast.error(error.message);
    }
  };

  const toggleSave = async () => {
    if (!user || !id) return navigate("/auth");
    const next = !saved;
    setSaved(next);
    const { error } = await persistSave(user.id, id, next);
    if (error) {
      setSaved(!next);
      toast.error(error.message);
    } else if (next) toast.success("Saved");
  };

  const recipeIngredients = (recipe?.ingredients?.length ? recipe.ingredients : ingredients.map((i) => i.name)) as string[];
  const recipeSteps = (recipe?.steps?.length ? recipe.steps : steps) as string[];
  const displayIngredients = minimalMode ? ingredients.filter((i) => i.have) : ingredients;

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Video/Image */}
      <div className="relative h-[45vh]">
        <img src={recipe?.thumbnail_url || recipe?.video_url || food1} alt={recipe?.title || "Recipe"} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-foreground/20" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="absolute top-12 right-4 flex gap-2">
          <button onClick={toggleLike} className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <Heart className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : "text-foreground"}`} />
          </button>
          <button onClick={() => setCommentsOpen(true)} className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={toggleSave} className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <Bookmark className={`w-5 h-5 ${saved ? "fill-primary text-primary" : "text-foreground"}`} />
          </button>
          <button onClick={() => setShareOpen(true)} className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="px-5 -mt-8 relative z-10">
        <div className="glass-card p-5">
          <h1 className="text-xl font-bold font-display text-foreground">{recipe?.title || "Smoky Jollof Rice"}</h1>
          <p className="text-sm text-muted-foreground mt-1">{recipe?.like_count || 0} likes • {recipe?.comment_count || 0} comments</p>

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
                {(recipe ? recipeIngredients.map((name) => ({ name, amount: "", have: true })) : displayIngredients).map((ing) => (
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
              {recipeSteps.map((step, i) => (
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
      <CommentsSheet recipeId={id || null} onClose={() => setCommentsOpen(false)} onCountChange={(_, delta) => setRecipe((r: any) => r ? { ...r, comment_count: Math.max(0, (r.comment_count || 0) + delta) } : r)} />
      {!commentsOpen && <ShareSheet recipe={shareOpen && id ? { id, title: recipe?.title || "Recipe" } : null} onClose={() => setShareOpen(false)} />}
    </div>
  );
};

export default RecipeDetail;
