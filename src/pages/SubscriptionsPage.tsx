import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Check, Play, Lock, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";
import food5 from "@/assets/food-5.jpg";
import food6 from "@/assets/food-6.jpg";

const creators = [
  { name: "Chef Ada", handle: "@chef_ada", avatar: food1, followers: "12.4k", videos: 48, subscribed: false },
  { name: "Marco Cooks", handle: "@marco_cooks", avatar: food2, followers: "8.1k", videos: 35, subscribed: true },
  { name: "Yuki Eats", handle: "@yuki_eats", avatar: food3, followers: "22k", videos: 92, subscribed: false },
  { name: "Sweet Amara", handle: "@sweet_amara", avatar: food4, followers: "5.6k", videos: 21, subscribed: false },
];

const freeContent = [
  { image: food1, title: "Quick Jollof Rice", creator: "Chef Ada", views: "4.2k", isLocked: false },
  { image: food5, title: "Easy Street Tacos", creator: "Carlos", views: "2.8k", isLocked: false },
  { image: food3, title: "Poke Bowl Basics", creator: "Yuki", views: "6.1k", isLocked: false },
  { image: food6, title: "Morning Smoothie", creator: "Priya", views: "3.5k", isLocked: false },
];

const premiumContent = [
  { image: food2, title: "Secret Carbonara Technique", creator: "Marco", views: "1.2k", isLocked: true },
  { image: food4, title: "Lava Cake Masterclass", creator: "Amara", views: "890", isLocked: true },
  { image: food1, title: "Advanced Jollof Variations", creator: "Chef Ada", views: "2.1k", isLocked: true },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    features: ["Browse all free recipes", "Save favorites", "Basic search", "Community access"],
    current: true,
  },
  {
    name: "Premium",
    price: "$4.99",
    period: "/month",
    features: ["Exclusive recipes", "Direct creator chat", "Personalized tips", "No ads", "Meal planner"],
    popular: true,
  },
  {
    name: "Pro Chef",
    price: "$9.99",
    period: "/month",
    features: ["Everything in Premium", "1-on-1 cooking sessions", "Early access to content", "Recipe PDF exports"],
  },
];

const SubscriptionsPage = () => {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [tab, setTab] = useState<"discover" | "subscribed">("discover");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 pt-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold font-display text-foreground">Subscriptions</h1>
        <button
          onClick={() => setShowUpgrade(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
        >
          <Crown className="w-3.5 h-3.5" /> Upgrade
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setTab("discover")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === "discover" ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-secondary text-foreground"
          }`}
        >
          Discover
        </button>
        <button
          onClick={() => setTab("subscribed")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === "subscribed" ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-secondary text-foreground"
          }`}
        >
          Subscribed
        </button>
      </div>

      {tab === "discover" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Creators to subscribe */}
          <h2 className="text-sm font-bold text-foreground mb-3">Popular Creators</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-4">
            {creators.map((c) => (
              <div
                key={c.handle}
                className="flex-shrink-0 w-36 glass-card p-3 flex flex-col items-center text-center cursor-pointer"
                onClick={() => navigate("/creator/1")}
              >
                <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-full object-cover mb-2 border-2 border-primary/30" />
                <h3 className="text-xs font-bold text-foreground truncate w-full">{c.name}</h3>
                <p className="text-[10px] text-muted-foreground">{c.followers} followers</p>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className={`mt-2 w-full py-1.5 rounded-xl text-[10px] font-semibold transition-all ${
                    c.subscribed
                      ? "bg-secondary text-muted-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {c.subscribed ? "Subscribed" : "Subscribe"}
                </button>
              </div>
            ))}
          </div>

          {/* Free content reels */}
          <h2 className="text-sm font-bold text-foreground mb-3">Free Content</h2>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {freeContent.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="relative aspect-[9/14] rounded-2xl overflow-hidden cursor-pointer active:scale-[0.97] transition-transform"
                onClick={() => navigate("/recipe/1")}
              >
                <img src={v.image} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-primary-foreground fill-current ml-0.5" />
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-[11px] font-bold text-primary-foreground leading-tight">{v.title}</h3>
                  <p className="text-[9px] text-primary-foreground/70 mt-0.5">{v.creator} · {v.views}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Premium locked content */}
          <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-primary" /> Premium Content
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {premiumContent.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="relative aspect-[9/14] rounded-2xl overflow-hidden cursor-pointer active:scale-[0.97] transition-transform"
                onClick={() => setShowUpgrade(true)}
              >
                <img src={v.image} alt={v.title} className="w-full h-full object-cover blur-[2px]" loading="lazy" />
                <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-[11px] font-bold text-primary-foreground leading-tight">{v.title}</h3>
                  <p className="text-[9px] text-primary-foreground/70 mt-0.5">{v.creator}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {tab === "subscribed" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {creators.filter(c => c.subscribed).length === 0 ? (
            <div className="text-center py-16">
              <Crown className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No subscriptions yet</p>
              <p className="text-muted-foreground/70 text-xs mt-1">Discover creators and subscribe to see their content here</p>
            </div>
          ) : (
            creators.filter(c => c.subscribed).map((c) => (
              <div key={c.handle} className="glass-card p-4 flex items-center gap-3 mb-3 cursor-pointer" onClick={() => navigate("/creator/1")}>
                <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-foreground">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.videos} videos · {c.followers} followers</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))
          )}
        </motion.div>
      )}

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgrade && (
          <motion.div
            className="fixed inset-0 z-50 bg-foreground/50 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUpgrade(false)}
          >
            <motion.div
              className="w-full max-w-lg bg-card rounded-t-3xl p-6 pb-10"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold font-display text-foreground">Upgrade Your Plan</h2>
                <button onClick={() => setShowUpgrade(false)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              <div className="space-y-3">
                {plans.map((plan, i) => (
                  <div
                    key={plan.name}
                    className={`p-4 rounded-2xl border transition-all ${
                      plan.popular ? "border-primary bg-primary/5" : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-foreground">{plan.name}</h3>
                          {plan.popular && (
                            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[9px] font-bold">Popular</span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-0.5 mt-0.5">
                          <span className="text-xl font-bold text-foreground">{plan.price}</span>
                          <span className="text-xs text-muted-foreground">{plan.period}</span>
                        </div>
                      </div>
                      <button
                        className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                          plan.current
                            ? "bg-secondary text-muted-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {plan.current ? "Current" : "Select"}
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {plan.features.map((f) => (
                        <span key={f} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                          <Check className="w-2.5 h-2.5 text-primary" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionsPage;
