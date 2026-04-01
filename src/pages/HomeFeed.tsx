import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StoriesRow from "@/components/StoriesRow";
import VideoCard from "@/components/VideoCard";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";

const feedItems = [
  { image: food1, title: "Smoky Jollof Rice with Grilled Chicken", creator: "chef_ada", likes: "2.4k", tags: ["Low cost", "Quick meal"] },
  { image: food2, title: "Classic Pasta Carbonara", creator: "marco_cooks", likes: "5.1k", tags: ["Few ingredients"] },
  { image: food3, title: "Fresh Salmon Poke Bowl", creator: "yuki_eats", likes: "3.8k", tags: ["Quick meal"] },
  { image: food4, title: "Chocolate Lava Cake", creator: "sweet_amara", likes: "8.2k", tags: ["Low cost", "Few ingredients"] },
];

const HomeFeed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl px-4 pt-12 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold font-display text-gradient">RESEEPE</h1>
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center" onClick={() => navigate("/search")}>
            <Search className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Stories */}
      <StoriesRow />

      {/* Feed */}
      <div className="px-4 space-y-5 mt-2">
        {feedItems.map((item, i) => (
          <VideoCard
            key={i}
            {...item}
            onClick={() => navigate("/recipe/1")}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeFeed;
