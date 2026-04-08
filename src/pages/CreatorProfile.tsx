import { ArrowLeft, Star, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";
import food5 from "@/assets/food-5.jpg";
import food6 from "@/assets/food-6.jpg";

const videos = [food1, food2, food3, food4, food5, food6];

const CreatorProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Cover */}
      <div className="relative h-40">
        <img src={food1} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="px-4 -mt-12 relative z-10">
        {/* Avatar + info */}
        <div className="flex items-end gap-4 mb-4">
          <div className="w-20 h-20 rounded-2xl border-4 border-background overflow-hidden">
            <img src={food1} alt="Chef Ada" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-1">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-lg text-foreground">Chef Ada</h1>
              <BadgeCheck className="w-5 h-5 text-primary fill-primary/20" />
            </div>
            <p className="text-sm text-muted-foreground">Nigerian Cuisine Expert</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-4">
          <div><span className="font-bold text-foreground">12.5k</span> <span className="text-xs text-muted-foreground">Followers</span></div>
          <div><span className="font-bold text-foreground">48</span> <span className="text-xs text-muted-foreground">Recipes</span></div>
          <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /><span className="font-bold text-foreground">4.9</span></div>
        </div>

        {/* Actions - Creator has Subscribe + Message */}
        <div className="flex gap-3 mb-6">
          <button className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25">
            Subscribe
          </button>
          <button className="px-5 py-3 rounded-2xl bg-secondary text-foreground font-semibold text-sm">
            Message
          </button>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Passionate about making Nigerian food accessible to everyone. 🔥 10+ years of cooking experience. New recipes every week!
        </p>

        {/* Creator stats cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="glass-card p-3 text-center">
            <p className="text-xl font-bold text-primary">1.2M</p>
            <p className="text-[10px] text-muted-foreground">Total Views</p>
          </div>
          <div className="glass-card p-3 text-center">
            <p className="text-xl font-bold text-primary">98%</p>
            <p className="text-[10px] text-muted-foreground">Approval</p>
          </div>
        </div>

        {/* Videos grid */}
        <h3 className="font-bold text-foreground mb-3">Recipes</h3>
        <div className="grid grid-cols-3 gap-2">
          {videos.map((v, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-xl overflow-hidden cursor-pointer active:scale-[0.97] transition-transform"
              onClick={() => navigate("/recipe/1")}
            >
              <img src={v} alt="Recipe" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
