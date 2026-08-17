import { motion } from "framer-motion";
import { ShieldAlert, TrendingDown, Clock, Dna, Cigarette, BookOpen } from "lucide-react";

const riskFactors = [
  { icon: Clock, title: "Age", detail: "Risk doubles every 5 years after age 65. Over 30% of people aged 85+ are affected.", severity: 85 },
  { icon: Dna, title: "Genetics (APOE-ε4)", detail: "Carriers of the APOE-ε4 allele have 3–15x higher risk depending on zygosity.", severity: 75 },
  { icon: TrendingDown, title: "Cardiovascular Health", detail: "Hypertension, diabetes, and obesity in midlife significantly increase dementia risk.", severity: 60 },
  { icon: Cigarette, title: "Lifestyle Factors", detail: "Smoking, physical inactivity, social isolation, and poor diet accelerate cognitive decline.", severity: 50 },
  { icon: BookOpen, title: "Education & Cognitive Reserve", detail: "Lower educational attainment correlates with earlier onset. Lifelong learning is protective.", severity: 40 },
  { icon: ShieldAlert, title: "Head Trauma", detail: "History of traumatic brain injury (TBI) increases Alzheimer's risk, especially repeated concussions.", severity: 55 },
];

const RiskAssessment = () => (
  <section id="risk" className="py-24 neural-bg relative">
    <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3 border border-accent/30 rounded-full px-4 py-1">
          Risk Profiling
        </span>
        <h2 className="font-display text-4xl font-bold gradient-text mb-3">Risk Factor Assessment</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Understanding modifiable and non-modifiable risk factors is critical for early intervention and prevention strategies.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {riskFactors.map((rf, i) => (
          <motion.div
            key={rf.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <rf.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">{rf.title}</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{rf.detail}</p>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Impact Level</span>
                <span className="text-foreground font-medium">{rf.severity}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${rf.severity}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: rf.severity > 70 ? "hsl(var(--stage-alzheimer))" : rf.severity > 50 ? "hsl(var(--stage-mci))" : "var(--gradient-primary)" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default RiskAssessment;
