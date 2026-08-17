import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, CheckCircle2, AlertTriangle, ChevronRight } from "lucide-react";

const symptoms = [
  { id: "memory", label: "Memory loss that disrupts daily life", weight: 3 },
  { id: "planning", label: "Challenges in planning or problem solving", weight: 2 },
  { id: "tasks", label: "Difficulty completing familiar tasks", weight: 2 },
  { id: "time", label: "Confusion with time or place", weight: 3 },
  { id: "visual", label: "Trouble understanding visual or spatial relationships", weight: 2 },
  { id: "words", label: "New problems with words in speaking or writing", weight: 2 },
  { id: "misplacing", label: "Misplacing things and losing the ability to retrace steps", weight: 1 },
  { id: "judgment", label: "Decreased or poor judgment", weight: 2 },
  { id: "withdrawal", label: "Withdrawal from work or social activities", weight: 2 },
  { id: "mood", label: "Changes in mood and personality", weight: 1 },
];

const getRiskResult = (score: number, total: number) => {
  const pct = (score / total) * 100;
  if (pct < 20) return { level: "Low Risk", color: "stage-normal", advice: "Your responses suggest minimal cognitive concerns. Continue maintaining a healthy lifestyle with regular exercise, social engagement, and mental stimulation." };
  if (pct < 45) return { level: "Mild Concern", color: "stage-mild", advice: "Some early indicators are present. Consider scheduling a cognitive screening with your primary care physician within the next few months." };
  if (pct < 70) return { level: "Moderate Concern", color: "stage-mci", advice: "Multiple warning signs detected. We strongly recommend a comprehensive neurological evaluation including cognitive testing and brain imaging." };
  return { level: "High Concern", color: "stage-alzheimer", advice: "Significant symptoms reported. Please seek immediate evaluation from a neurologist or memory disorder specialist. Early intervention can make a meaningful difference." };
};

const SymptomChecker = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalWeight = symptoms.reduce((s, sy) => s + sy.weight, 0);
  const score = symptoms.filter((s) => checked.has(s.id)).reduce((s, sy) => s + sy.weight, 0);
  const result = getRiskResult(score, totalWeight);

  return (
    <section id="symptoms" className="py-24 neural-bg relative">
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3 border border-accent/30 rounded-full px-4 py-1">
            Self-Assessment
          </span>
          <h2 className="font-display text-4xl font-bold gradient-text mb-3">Symptom Checker</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Check any symptoms you or your loved one has been experiencing. This is not a diagnosis — it's a screening tool to guide next steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-3">
            {symptoms.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { toggle(s.id); setSubmitted(false); }}
                className={`w-full text-left glass-card rounded-xl px-4 py-3 flex items-center gap-3 transition-all ${
                  checked.has(s.id) ? "border-primary/40 bg-primary/5" : "hover:border-border/80"
                }`}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                  checked.has(s.id) ? "bg-primary border-primary" : "border-muted-foreground/30"
                }`}>
                  {checked.has(s.id) && <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />}
                </div>
                <span className="text-sm text-foreground">{s.label}</span>
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSubmitted(true)}
              className="btn-primary-glow w-full py-3 rounded-xl font-semibold text-primary-foreground flex items-center justify-center gap-2 mt-2"
            >
              <Stethoscope className="w-5 h-5" /> Evaluate Symptoms
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className={`glass-card rounded-2xl p-6 border ${result.color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <p className="text-sm uppercase tracking-wider font-semibold">{result.level}</p>
                  </div>
                  <p className="text-3xl font-display font-bold mb-1">{checked.size}/{symptoms.length}</p>
                  <p className="text-xs opacity-70">symptoms selected</p>
                </div>

                {/* Score bar */}
                <div className="glass-card rounded-2xl p-6">
                  <p className="text-sm text-muted-foreground font-medium mb-3">Weighted Risk Score</p>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(score / totalWeight) * 100}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full"
                      style={{ background: "var(--gradient-primary)" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{Math.round((score / totalWeight) * 100)}% risk indicator</p>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <p className="text-sm text-muted-foreground font-medium mb-2">Recommended Action</p>
                  <p className="text-foreground text-sm leading-relaxed">{result.advice}</p>
                </div>

                <p className="text-xs text-muted-foreground text-center italic">
                  ⚕️ This tool is for informational purposes only and does not constitute medical advice.
                </p>
              </motion.div>
            ) : (
              <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl flex flex-col items-center justify-center min-h-[400px] text-center px-6">
                <Stethoscope className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground mb-4">Select symptoms and click "Evaluate" to receive a preliminary risk assessment.</p>
                <div className="flex items-center gap-2 text-xs text-primary/70">
                  <ChevronRight className="w-4 h-4" />
                  <span>Based on Alzheimer's Association 10 Warning Signs</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
