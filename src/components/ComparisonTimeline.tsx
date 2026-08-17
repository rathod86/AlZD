import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const stages = [
  {
    stage: "Normal",
    years: "0",
    color: "hsl(var(--stage-normal))",
    mmse: "27–30",
    hippocampus: "100%",
    symptoms: "No noticeable cognitive decline",
    intervention: "Prevention — exercise, diet, cognitive engagement",
  },
  {
    stage: "Very Mild Impairment",
    years: "2–4",
    color: "hsl(var(--stage-mild))",
    mmse: "24–27",
    hippocampus: "90–95%",
    symptoms: "Occasional forgetfulness, misplacing items",
    intervention: "Lifestyle modification, cognitive training, monitoring",
  },
  {
    stage: "Mild Cognitive Impairment",
    years: "4–8",
    color: "hsl(var(--stage-mci))",
    mmse: "18–24",
    hippocampus: "75–85%",
    symptoms: "Noticeable memory gaps, planning difficulties, word-finding issues",
    intervention: "Specialist referral, pharmacological intervention, care planning",
  },
  {
    stage: "Alzheimer's Disease",
    years: "8+",
    color: "hsl(var(--stage-alzheimer))",
    mmse: "<18",
    hippocampus: "50–70%",
    symptoms: "Severe memory loss, disorientation, personality changes, dependency",
    intervention: "Full-time care coordination, symptom management, family support",
  },
];

const ComparisonTimeline = () => (
  <section id="timeline" className="py-24 neural-bg relative">
    <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3 border border-accent/30 rounded-full px-4 py-1">
          Disease Progression
        </span>
        <h2 className="font-display text-4xl font-bold gradient-text mb-3">Stage Comparison Timeline</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          A detailed comparison of cognitive, biological, and clinical markers across each stage of Alzheimer's progression.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(var(--stage-normal))] via-[hsl(var(--stage-mci))] to-[hsl(var(--stage-alzheimer))] opacity-30" />

        <div className="grid md:grid-cols-4 gap-5">
          {stages.map((s, i) => (
            <motion.div
              key={s.stage}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-2xl p-5 relative"
            >
              {/* Timeline dot */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full border-2 shrink-0" style={{ borderColor: s.color, background: `${s.color}30` }}>
                  <div className="w-2 h-2 rounded-full m-auto mt-[3px]" style={{ background: s.color }} />
                </div>
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{s.years} years</span>
              </div>

              <h3 className="font-display font-bold text-foreground text-sm mb-3" style={{ color: s.color }}>{s.stage}</h3>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-muted-foreground">MMSE Score</span>
                  <p className="text-foreground font-semibold">{s.mmse}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Hippocampal Volume</span>
                  <p className="text-foreground font-semibold">{s.hippocampus}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Key Symptoms</span>
                  <p className="text-foreground leading-relaxed">{s.symptoms}</p>
                </div>
                <div className="pt-2 border-t border-border/50">
                  <span className="text-muted-foreground">Intervention</span>
                  <p className="text-foreground leading-relaxed">{s.intervention}</p>
                </div>
              </div>

              {i < stages.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-3.5 top-8 w-4 h-4 text-muted-foreground/40 z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ComparisonTimeline;
