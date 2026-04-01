import { Upload, Plus, X } from "lucide-react";
import { useState } from "react";

const tagOptions = ["Cheap", "Fast", "Healthy", "Comfort", "Spicy", "Vegan"];

const CreatePage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-12 px-4">
      <h1 className="text-xl font-bold font-display text-foreground mb-6">Upload Recipe</h1>

      {/* Video upload */}
      <div className="aspect-video rounded-2xl border-2 border-dashed border-primary/30 bg-light-orange flex flex-col items-center justify-center gap-3 mb-6 cursor-pointer active:scale-[0.98] transition-transform">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">Upload food video</p>
        <p className="text-xs text-muted-foreground">MP4, MOV up to 100MB</p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground mb-1.5 block">Recipe Name</label>
          <input placeholder="e.g. Smoky Jollof Rice" className="w-full px-4 py-3.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-foreground mb-1.5 block">Est. Cost</label>
            <input placeholder="$5" className="w-full px-4 py-3.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-1.5 block">Cook Time</label>
            <input placeholder="30 min" className="w-full px-4 py-3.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-1.5 block">Ingredients</label>
          <textarea rows={3} placeholder="List ingredients, one per line" className="w-full px-4 py-3.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-1.5 block">Steps</label>
          <textarea rows={4} placeholder="Describe each step..." className="w-full px-4 py-3.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                {selectedTags.includes(tag) && <X className="w-3 h-3 inline mr-1" />}
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full mt-4 bg-primary text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform">
          Publish Recipe
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
