import { Search, Crown, Lock, MessageSquare, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StoriesRow from "@/components/StoriesRow";
import VerifiedBadge from "@/components/VerifiedBadge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getFeedCache, setFeedCache } from "@/lib/feedCache";

type Recipe = {
  id: string;
  title: string;
  thumbnail_url: string | null;
  video_url: string | null;
  cook_time: string | null;
  cost_estimate: string | null;
  like_count: number;
  comment_count: number;
  creator_id: string;
  tags: string[] | null;
  creator?: { display_name: string | null; username: string | null; avatar_url: string | null };
  verified?: boolean;
  country?: string | null;
};

const FeedVideo = ({ src, poster, title }: { src: string; poster?: string; title: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: [0, 0.5, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={title}
      className="w-full h-full object-cover"
    />
  );
};

const HomeFeed = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>(() => getFeedCache<Recipe>());
  const [loading, setLoading] = useState(() => getFeedCache<Recipe>().length === 0);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      const rows = (data || []) as any[];
      const cIds = Array.from(new Set(rows.map((r) => r.creator_id)));
      const [{ data: profs }, { data: fcs }] = await Promise.all([
        supabase.from("profiles").select("user_id,display_name,username,avatar_url").in("user_id", cIds.length ? cIds : ["00000000-0000-0000-0000-000000000000"]),
        supabase.from("featured_creators" as any).select("username,verified,country"),
      ]);
      const profMap = new Map((profs || []).map((p: any) => [p.user_id, p]));
      const fcMap = new Map((fcs as any[] || []).map((f: any) => [f.username, f]));
      const enriched = rows.map((r) => {
          const p = profMap.get(r.creator_id);
          const fc = p?.username ? fcMap.get(p.username) : null;
          return { ...r, creator: p, verified: !!fc?.verified, country: fc?.country || null };
        });
      setRecipes(enriched);
      setFeedCache(enriched);
      setLoading(false);
    })();
  }, []);

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
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center" onClick={() => navigate("/messages")}>
              <MessageSquare className="w-4 h-4 text-foreground" />
            </button>
            <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center" onClick={() => navigate("/search")}>
              <Search className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <StoriesRow />

      <div className="px-4 space-y-4 mt-4">
        {loading && <div className="text-center py-10 text-sm text-muted-foreground">Loading...</div>}

        {recipes.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/reels?id=${r.id}`)}
            className="relative w-full aspect-[9/14] rounded-3xl overflow-hidden cursor-pointer group"
          >
            {r.thumbnail_url ? (
              <img src={r.thumbnail_url} alt={r.title} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-secondary" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
            {/* Tags */}
            {r.tags && r.tags.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                {r.tags.slice(0, 2).map((t) => (
                  <span key={t} className="tag-badge bg-card/80 text-foreground">{t}</span>
                ))}
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 rounded-full bg-foreground/30 backdrop-blur-md flex items-center justify-center">
                <Play className="w-7 h-7 text-primary-foreground fill-current ml-1" />
              </div>
            </div>
            {r.creator?.avatar_url && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/creator/${r.creator?.username}`); }}
                className="absolute top-4 right-4 z-20"
              >
                <div className="relative">
                  <img src={r.creator.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-primary-foreground/80 shadow-lg" />
                  {r.verified && <div className="absolute -bottom-0.5 -right-0.5"><VerifiedBadge size="sm" /></div>}
                </div>
              </button>
            )}
            <div className="absolute bottom-4 left-4 right-16 z-10">
              <h3 className="text-primary-foreground font-bold text-lg leading-tight line-clamp-2">{r.title}</h3>
              <div className="flex items-center gap-1 mt-1">
                <p className="text-primary-foreground/80 text-sm">@{r.creator?.username}</p>
                {r.verified && <VerifiedBadge size="sm" />}
              </div>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-primary-foreground/80">
                {r.cook_time && <span>⏱ {r.cook_time}</span>}
                {r.cost_estimate && <span>💰 {r.cost_estimate}</span>}
                <span>♥ {r.like_count}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {!loading && recipes.length === 0 && (
          <div className="text-center py-16">
            <Lock className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No recipes yet</p>
          </div>
        )}

        <div className="text-center py-8">
          <button
            onClick={() => navigate("/subscriptions")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25"
          >
            <Crown className="w-4 h-4" /> View Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;
