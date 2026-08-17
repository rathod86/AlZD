import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const regions = [
  { id: "hippocampus", label: "Hippocampus", x: 48, y: 55, role: "Memory formation & spatial navigation", impact: "critical", atrophy: 78, description: "The hippocampus is one of the first regions affected in Alzheimer's. Significant volume reduction correlates directly with memory loss severity." },
  { id: "entorhinal", label: "Entorhinal Cortex", x: 42, y: 62, role: "Memory consolidation gateway", impact: "critical", atrophy: 72, description: "Acts as a hub connecting the hippocampus with the neocortex. Neurofibrillary tangles first appear here, often before clinical symptoms." },
  { id: "temporal", label: "Temporal Lobe", x: 28, y: 50, role: "Language comprehension & auditory processing", impact: "high", atrophy: 55, description: "Temporal lobe atrophy leads to language difficulties, trouble recognizing faces, and impaired understanding of speech." },
  { id: "parietal", label: "Parietal Lobe", x: 55, y: 28, role: "Spatial awareness & calculation", impact: "moderate", atrophy: 40, description: "Affected in moderate stages, causing difficulty with spatial relationships, mathematical reasoning, and body awareness." },
  { id: "frontal", label: "Frontal Lobe", x: 30, y: 25, role: "Executive function & personality", impact: "moderate", atrophy: 35, description: "Frontal involvement leads to changes in personality, judgment, planning ability, and social behavior in later stages." },
  { id: "amygdala", label: "Amygdala", x: 40, y: 52, role: "Emotional processing & fear response", impact: "high", atrophy: 60, description: "Amygdala degeneration contributes to emotional changes, anxiety, agitation, and altered fear responses seen in patients." },
];

const impactColor = { critical: "hsl(var(--stage-alzheimer))", high: "hsl(var(--stage-mci))", moderate: "hsl(var(--stage-mild))" };

const BrainRegionAnalysis = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const active = regions.find((r) => r.id === selected);

  return (
    <section id="brain-regions" className="py-24 neural-bg relative">
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3 border border-accent/30 rounded-full px-4 py-1">
            Neuroanatomy
          </span>
          <h2 className="font-display text-4xl font-bold gradient-text mb-3">Brain Region Analysis</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Explore how Alzheimer's progressively affects different brain regions and their cognitive functions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Interactive brain map */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
            <div className="relative aspect-square max-w-sm mx-auto">
              {/* Simplified brain outline via SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <radialGradient id="brainFill">
                    <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="hsl(270 60% 55%)" stopOpacity="0.05" />
                  </radialGradient>
                </defs>
                {/* Brain shape */}
                <path
                  d="M50 10 C25 10, 10 30, 12 50 C14 68, 25 82, 38 85 C42 86, 46 84, 50 82 C54 84, 58 86, 62 85 C75 82, 86 68, 88 50 C90 30, 75 10, 50 10 Z"
                  fill="url(#brainFill)"
                  stroke="hsl(217 91% 60%)"
                  strokeWidth="0.5"
                  strokeOpacity="0.4"
                />
                {/* Center fold */}
                <path d="M50 14 C50 14, 48 45, 50 82" fill="none" stroke="hsl(217 91% 60%)" strokeWidth="0.3" strokeOpacity="0.3" />

                {/* Region markers */}
                {regions.map((r) => (
                  <g key={r.id} onClick={() => setSelected(r.id === selected ? null : r.id)} className="cursor-pointer">
                    <circle
                      cx={r.x} cy={r.y} r={selected === r.id ? 4 : 3}
                      fill={impactColor[r.impact as keyof typeof impactColor]}
                      fillOpacity={selected === r.id ? 0.9 : 0.6}
                      stroke={impactColor[r.impact as keyof typeof impactColor]}
                      strokeWidth={selected === r.id ? 1.5 : 0.5}
                    />
                    {selected === r.id && (
                      <circle cx={r.x} cy={r.y} r="6" fill="none" stroke={impactColor[r.impact as keyof typeof impactColor]} strokeWidth="0.5" className="animate-pulse" />
                    )}
                  </g>
                ))}
              </svg>

              {/* Labels */}
              {regions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id === selected ? null : r.id)}
                  className={`absolute text-[9px] font-medium transition-all whitespace-nowrap ${
                    selected === r.id ? "text-foreground scale-110" : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ left: `${r.x}%`, top: `${r.y - 7}%`, transform: "translateX(-50%)" }}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 mt-4">
              {Object.entries(impactColor).map(([level, color]) => (
                <span key={level} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Detail panel */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div key={active.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3 className="font-display text-xl font-bold text-foreground">{active.label}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{active.role}</p>
                    <p className="text-sm text-foreground leading-relaxed">{active.description}</p>
                  </div>

                  <div className="glass-card rounded-2xl p-6">
                    <p className="text-sm text-muted-foreground font-medium mb-3">Atrophy Level in Alzheimer's</p>
                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${active.atrophy}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full"
                        style={{ background: impactColor[active.impact as keyof typeof impactColor] }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{active.atrophy}% average volume reduction</p>
                  </div>

                  <div className="glass-card rounded-2xl p-6">
                    <p className="text-sm text-muted-foreground font-medium mb-2">Impact Severity</p>
                    <span
                      className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                      style={{ color: impactColor[active.impact as keyof typeof impactColor], borderColor: impactColor[active.impact as keyof typeof impactColor], background: `${impactColor[active.impact as keyof typeof impactColor]}15` }}
                    >
                      {active.impact}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl flex flex-col items-center justify-center min-h-[400px] text-center px-6">
                  <MapPin className="w-12 h-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground">Click on any brain region marker to explore how Alzheimer's affects it.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick region pills */}
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id === selected ? null : r.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    selected === r.id
                      ? "border-primary/40 bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrainRegionAnalysis;
