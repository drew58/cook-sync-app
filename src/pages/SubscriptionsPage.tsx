import { Crown, Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    features: ["Browse all recipes", "Save favorites", "Basic search"],
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

const SubscriptionsPage = () => (
  <div className="min-h-screen bg-background pb-24 pt-12 px-4">
    <h1 className="text-xl font-bold font-display text-foreground mb-1">Subscriptions</h1>
    <p className="text-sm text-muted-foreground mb-6">Unlock premium features and exclusive content</p>

    <div className="space-y-4">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`glass-card p-5 relative overflow-hidden ${plan.popular ? "border-primary/50 ring-1 ring-primary/20" : ""}`}
        >
          {plan.popular && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-[10px] font-bold">
              <Crown className="w-3 h-3" /> Popular
            </div>
          )}
          <h3 className="font-bold text-foreground text-lg">{plan.name}</h3>
          <div className="flex items-baseline gap-0.5 mt-1">
            <span className="text-2xl font-bold text-foreground">{plan.price}</span>
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          </div>
          <div className="mt-4 space-y-2.5">
            {plan.features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-green-600" />
                </div>
                <span className="text-sm text-foreground">{f}</span>
              </div>
            ))}
          </div>
          <button
            className={`w-full mt-5 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98] ${
              plan.current
                ? "bg-secondary text-muted-foreground"
                : "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            }`}
          >
            {plan.current ? "Current Plan" : "Upgrade"}
          </button>
        </motion.div>
      ))}
    </div>
  </div>
);

export default SubscriptionsPage;
