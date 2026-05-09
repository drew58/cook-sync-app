import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";
import food5 from "@/assets/food-5.jpg";
import food6 from "@/assets/food-6.jpg";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import StoryCreateSheet from "@/components/StoryCreateSheet";

const stories = [
  { name: "Chef Ada", image: food1 },
  { name: "Marco", image: food2 },
  { name: "Yuki", image: food3 },
  { name: "Amara", image: food4 },
  { name: "Carlos", image: food5 },
  { name: "Priya", image: food6 },
];

type StoryItem = { id: string; media_url: string; media_type: string; user_id: string; caption: string | null; profile?: { display_name: string | null; username: string | null; avatar_url: string | null } };

const StoriesRow = () => {
  const { user } = useAuth();
  const [openCreate, setOpenCreate] = useState(false);
  const [liveStories, setLiveStories] = useState<StoryItem[]>([]);

  const loadStories = async () => {
    const { data } = await supabase.from("stories").select("id,media_url,media_type,user_id,caption,created_at").order("created_at", { ascending: false }).limit(16);
    const rows = ((data || []) as StoryItem[]).filter((row, index, arr) => arr.findIndex((x) => x.user_id === row.user_id) === index);
    const ids = [...new Set(rows.map((r) => r.user_id))];
    if (ids.length) {
      const { data: profiles } = await supabase.from("profiles").select("user_id,display_name,username,avatar_url").in("user_id", ids);
      const map = new Map((profiles || []).map((p: any) => [p.user_id, p]));
      rows.forEach((r) => (r.profile = map.get(r.user_id)));
    }
    setLiveStories(rows);
  };

  useEffect(() => {
    loadStories();
    const ch = supabase.channel("stories-row").on("postgres_changes", { event: "*", schema: "public", table: "stories" }, loadStories).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  return (
    <>
      <div className="flex gap-3 sm:gap-4 overflow-x-auto px-3 sm:px-4 py-3 scrollbar-hide -mx-1">
        <button onClick={() => user ? setOpenCreate(true) : (window.location.href = "/auth")} className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex items-center justify-center border-2 border-dashed border-primary/40">
            <span className="text-primary text-xl font-light">+</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">Your Story</span>
        </button>
        {liveStories.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-br from-primary to-accent">
              <img src={s.profile?.avatar_url || s.media_url} alt={s.profile?.display_name || s.profile?.username || "Story"} className="w-full h-full rounded-full object-cover border-2 border-card" loading="lazy" />
            </div>
            <span className="text-[10px] text-foreground font-medium truncate w-14 sm:w-16 text-center">{s.profile?.display_name || s.profile?.username || "Story"}</span>
          </div>
        ))}
        {liveStories.length === 0 && stories.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-br from-primary to-accent">
              <img src={s.image} alt={s.name} className="w-full h-full rounded-full object-cover border-2 border-card" loading="lazy" />
            </div>
            <span className="text-[10px] text-foreground font-medium truncate w-14 sm:w-16 text-center">{s.name}</span>
          </div>
        ))}
      </div>
      <StoryCreateSheet open={openCreate} onClose={() => setOpenCreate(false)} onCreated={loadStories} />
    </>
  );
};

export default StoriesRow;
