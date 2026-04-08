import { Search, Crown, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StoriesRow from "@/components/StoriesRow";
import VideoCard from "@/components/VideoCard";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";
import food5 from "@/assets/food-5.jpg";
import food6 from "@/assets/food-6.jpg";

const freeFeedItems = [
  { image: food1, title: "Smoky Jollof Rice with Grilled Chicken", creator: "chef_ada", creatorCountry: "🇳🇬 Nigeria", likes: "2.4k", tags: ["Low cost", "Quick meal"], avatar: food1, verified: true },
  { image: food2, title: "Classic Pasta Carbonara", creator: "marco_cooks", creatorCountry: "🇮🇹 Italy", likes: "5.1k", tags: ["Few ingredients"], avatar: food2, verified: true },
  { image: food5, title: "Street Tacos al Pastor", creator: "carlos_kitchen", creatorCountry: "🇲🇽 Mexico", likes: "3.2k", tags: ["Low cost"], avatar: food5, verified: false },
  { image: food3, title: "Fresh Salmon Poke Bowl", creator: "yuki_eats", creatorCountry: "🇯🇵 Japan", likes: "3.8k", tags: ["Quick meal"], avatar: food3, verified: true },
];

const premiumFeedItems = [
  { image: food4, title: "Chocolate Lava Cake Masterclass", creator: "sweet_amara", creatorCountry: "🇬🇭 Ghana", likes: "8.2k", tags: ["Few ingredients"], avatar: food4, verified: true, locked: true },
  { image: food6, title: "Secret Spice Blending Session", creator: "priya_spices", creatorCountry: "🇮🇳 India", likes: "4.5k", tags: ["Low cost"], avatar: food6, verified: false, locked: true },
];

const FREE_LIMIT = 4; // Free users see limited feed

const HomeFeed = () => {
  const navigate = useNavigate();
  const [showUpgradeHint, setShowUpgradeHint] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl px-4 pt-12 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold font-display">
            <span className="text-primary">R</span>
            <span className="text-primary">E</span>
            <span className="text-primary">S</span>
            <span className="text-[hsl(142,50%,45%)]">E</span>
            <span className="text-[hsl(142,50%,45%)]">E</span>
            <span className="text-primary">P</span>
            <span className="text-primary">E</span>
          </h1>
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center" onClick={() => navigate("/search")}>
            <Search className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Stories */}
      <StoriesRow />

      {/* Free Feed */}
      <div className="px-4 space-y-5 mt-2">
        {freeFeedItems.slice(0, FREE_LIMIT).map((item, i) => (
          <VideoCard
            key={i}
            {...item}
            onClick={() => navigate("/recipe/1")}
            onCreatorClick={() => navigate("/creator/1")}
          />
        ))}

        {/* Upgrade prompt between free and locked */}
        <AnimatePresence>
          {showUpgradeHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Want more recipes?</p>
                <p className="text-xs text-muted-foreground">Subscribe to unlock premium content from top chefs worldwide</p>
              </div>
              <button
                onClick={() => navigate("/subscriptions")}
                className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex-shrink-0"
              >
                Upgrade
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium/locked content preview */}
        {premiumFeedItems.map((item, i) => (
          <VideoCard
            key={`premium-${i}`}
            {...item}
            onClick={() => navigate("/subscriptions")}
            onCreatorClick={() => navigate("/creator/1")}
          />
        ))}

        {/* End of feed */}
        <div className="text-center py-8">
          <Lock className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">You've reached the free limit</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Subscribe to see unlimited recipes</p>
          <button
            onClick={() => navigate("/subscriptions")}
            className="mt-3 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25"
          >
            View Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;
