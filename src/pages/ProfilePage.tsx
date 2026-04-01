import { Settings, Bookmark, Heart, Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food5 from "@/assets/food-5.jpg";

const savedRecipes = [food1, food2, food3, food5];

const menuItems = [
  { icon: Bookmark, label: "Saved Recipes", count: 24 },
  { icon: Heart, label: "Liked Videos", count: 156 },
  { icon: Users, label: "Subscriptions", count: 8 },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 pt-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold font-display text-foreground">Profile</h1>
        <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <Settings className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Profile card */}
      <div className="glass-card p-5 flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xl font-bold">
          AJ
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-foreground">Adaeze Johnson</h2>
          <p className="text-sm text-muted-foreground">@ada_cooks • Food Lover</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold">
          Edit
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Recipes", value: "24" },
          { label: "Following", value: "156" },
          { label: "Followers", value: "1.2k" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-3 text-center">
            <p className="font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="space-y-2 mb-6">
        {menuItems.map((item) => (
          <button key={item.label} className="w-full glass-card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
            <div className="w-10 h-10 rounded-xl bg-light-orange flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 text-sm font-semibold text-foreground text-left">{item.label}</span>
            <span className="text-xs text-muted-foreground mr-2">{item.count}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Saved grid */}
      <h3 className="font-bold text-foreground mb-3">Recently Saved</h3>
      <div className="grid grid-cols-2 gap-3">
        {savedRecipes.map((img, i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl overflow-hidden cursor-pointer active:scale-[0.97] transition-transform"
            onClick={() => navigate("/recipe/1")}
          >
            <img src={img} alt="Saved recipe" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
