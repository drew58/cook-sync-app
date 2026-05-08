import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";
import food5 from "@/assets/food-5.jpg";
import food6 from "@/assets/food-6.jpg";

const stories = [
  { name: "Chef Ada", image: food1 },
  { name: "Marco", image: food2 },
  { name: "Yuki", image: food3 },
  { name: "Amara", image: food4 },
  { name: "Carlos", image: food5 },
  { name: "Priya", image: food6 },
];

const StoriesRow = () => (
  <div className="flex gap-3 sm:gap-4 overflow-x-auto px-3 sm:px-4 py-3 scrollbar-hide -mx-1">
    <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex items-center justify-center border-2 border-dashed border-primary/40">
        <span className="text-primary text-xl font-light">+</span>
      </div>
      <span className="text-[10px] text-muted-foreground font-medium">Your Story</span>
    </div>
    {stories.map((s) => (
      <div key={s.name} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-br from-primary to-accent">
          <img src={s.image} alt={s.name} className="w-full h-full rounded-full object-cover border-2 border-card" loading="lazy" />
        </div>
        <span className="text-[10px] text-foreground font-medium truncate w-14 sm:w-16 text-center">{s.name}</span>
      </div>
    ))}
  </div>
);

export default StoriesRow;
