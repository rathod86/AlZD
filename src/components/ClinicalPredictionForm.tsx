import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Loader2, Brain, RotateCcw, AlertCircle } from "lucide-react";

type ClinicalResult = {
  prediction: string;
  confidence: number;
  riskLevel: "low" | "moderate" | "high" | "critical";
  details: { stage: string; probability: number }[];
  recommendation: string;
};

const FEATURES = [
  { key: "age", label: "Age", unit: "years", min: 40, max: 100, step: 1, placeholder: "e.g. 72", description: "Patient age at time of assessment" },
  { key: "mmse", label: "MMSE Score", unit: "/30", min: 0, max: 30, step: 1, placeholder: "e.g. 24", description: "Mini-Mental State Examination (0–30)" },
  { key: "cdr", label: "CDR Rating", unit: "", min: 0, max: 3, step: 0.5, placeholder: "e.g. 0.5", description: "Clinical Dementia Rating (0, 0.5, 1, 2, 3)" },
  { key: "etiv", label: "eTIV", unit: "mm³", min: 1000, max: 2200, step: 10, placeholder: "e.g. 1500", description: "Estimated Total Intracranial Volume" },
] as const;

const simulateClinicalPrediction = (values: Record<string, number>): Promise<ClinicalResult> =>
  new Promise((resolve) => {
    const { mmse, cdr, age } = values;

    let normalP = 60, mildP = 20, mciP = 12, alzP = 8;

    if (mmse < 20) { normalP -= 40; alzP += 25; mciP += 15; }
    else if (mmse < 24) { normalP -= 25; mciP += 15; mildP += 10; }
    else if (mmse < 27) { normalP -= 10; mildP += 10; }

    if (cdr >= 2) { normalP -= 30; alzP += 30; }
    else if (cdr >= 1) { normalP -= 20; mciP += 15; alzP += 5; }
    else if (cdr >= 0.5) { normalP -= 10; mildP += 10; }

    if (age > 80) { normalP -= 5; mciP += 5; }

    const total = Math.max(normalP, 1) + Math.max(mildP, 1) + Math.max(mciP, 1) + Math.max(alzP, 1);
    const stages = [
      { stage: "Normal", probability: +(Math.max(normalP, 1) / total * 100).toFixed(1) },
      { stage: "Very Mild Impairment", probability: +(Math.max(mildP, 1) / total * 100).toFixed(1) },
      { stage: "Mild Cognitive Impairment", probability: +(Math.max(mciP, 1) / total * 100).toFixed(1) },
      { stage: "Alzheimer's Disease", probability: +(Math.max(alzP, 1) / total * 100).toFixed(1) },
    ];

    const top = stages.reduce((a, b) => (a.probability > b.probability ? a : b));
    const riskLevel: ClinicalResult["riskLevel"] =
      top.stage === "Normal" ? "low" :
      top.stage === "Very Mild Impairment" ? "moderate" :
      top.stage === "Mild Cognitive Impairment" ? "high" : "critical";

    const recommendations: Record<string, string> = {
      Normal: "No immediate concerns. Continue routine cognitive screening annually.",
      "Very Mild Impairment": "Mild changes detected. Recommend follow-up assessment in 6 months and lifestyle interventions.",
      "Mild Cognitive Impairment": "Significant cognitive markers present. Recommend neuropsychological testing, MRI imaging, and specialist referral.",
      "Alzheimer's Disease": "Strong indicators of Alzheimer's pathology. Immediate specialist referral, comprehensive neurological evaluation, and care planning recommended.",
    };

    setTimeout(() => resolve({
      prediction: top.stage,
      confidence: top.probability,
      riskLevel,
      details: stages,
      recommendation: recommendations[top.stage],
    }), 2000);
  });

const riskColors = {
  low: "text-[hsl(var(--stage-normal))] border-[hsl(var(--stage-normal)/0.4)] bg-[hsl(var(--stage-normal)/0.1)]",
  moderate: "text-[hsl(var(--stage-mild))] border-[hsl(var(--stage-mild)/0.4)] bg-[hsl(var(--stage-mild)/0.1)]",
  high: "text-[hsl(var(--stage-mci))] border-[hsl(var(--stage-mci)/0.4)] bg-[hsl(var(--stage-mci)/0.1)]",
  critical: "text-[hsl(var(--stage-alzheimer))] border-[hsl(var(--stage-alzheimer)/0.4)] bg-[hsl(var(--stage-alzheimer)/0.1)]",
};

const ClinicalPredictionForm = () => {
  const [values, setValues] = useState<Record<string, string>>({ age: "", mmse: "", cdr: "", etiv: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClinicalResult | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    FEATURES.forEach((f) => {
      const v = parseFloat(values[f.key]);
      if (!values[f.key].trim()) errs[f.key] = "Required";
      else if (isNaN(v)) errs[f.key] = "Must be a number";
      else if (v < f.min || v > f.max) errs[f.key] = `Must be ${f.min}–${f.max}`;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const predict = async () => {
    if (!validate()) return;
    setLoading(true);
    const numValues: Record<string, number> = {};
    FEATURES.forEach((f) => { numValues[f.key] = parseFloat(values[f.key]); });
    const data = await simulateClinicalPrediction(numValues);
    setResult(data);
    setLoading(false);
  };

  const reset = () => {
    setValues({ age: "", mmse: "", cdr: "", etiv: "" });
    setErrors({});
    setResult(null);
  };

  return (
    <section id="clinical" className="py-24 neural-bg relative">
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3 border border-accent/30 rounded-full px-4 py-1">
            Feature-Based Prediction
          </span>
          <h2 className="font-display text-4xl font-bold mb-3 gradient-text">Clinical Feature Analysis</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Enter 4 clinical biomarkers to predict Alzheimer's stage without MRI — ideal for preliminary screening.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-foreground">{f.label}</label>
                  {f.unit && <span className="text-xs text-muted-foreground">{f.unit}</span>}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{f.description}</p>
                <input
                  type="number"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  placeholder={f.placeholder}
                  value={values[f.key]}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, [f.key]: e.target.value }));
                    if (errors[f.key]) setErrors((er) => { const n = { ...er }; delete n[f.key]; return n; });
                  }}
                  className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-colors placeholder:text-muted-foreground/50"
                />
                {errors[f.key] && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors[f.key]}
                  </p>
                )}
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={predict}
              disabled={loading}
              className="btn-primary-glow w-full py-3 rounded-xl font-semibold text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing Features…</>
              ) : (
                <><ClipboardList className="w-5 h-5" /> Run Clinical Prediction</>
              )}
            </motion.button>
          </motion.div>

          {/* Result */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
                  <Brain className="absolute inset-0 m-auto w-10 h-10 text-primary" />
                </div>
                <p className="text-foreground font-semibold">Processing Clinical Data…</p>
                <p className="text-muted-foreground text-sm mt-1">Running feature-based model</p>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                {/* Prediction + Risk */}
                <div className={`glass-card rounded-2xl p-6 border ${riskColors[result.riskLevel]}`}>
                  <p className="text-sm uppercase tracking-wider mb-1 opacity-80">Predicted Stage</p>
                  <h3 className="font-display text-2xl font-bold">{result.prediction}</h3>
                  <p className="text-xs mt-2 opacity-70 uppercase tracking-widest">Risk Level: {result.riskLevel}</p>
                </div>

                {/* Bars */}
                <div className="glass-card rounded-2xl p-6 space-y-3">
                  <p className="text-sm text-muted-foreground font-medium mb-2">Confidence Breakdown</p>
                  {result.details.map((d) => (
                    <div key={d.stage}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground">{d.stage}</span>
                        <span className="text-muted-foreground">{d.probability}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${d.probability}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendation */}
                <div className="glass-card rounded-2xl p-6">
                  <p className="text-sm text-muted-foreground font-medium mb-2">Clinical Recommendation</p>
                  <p className="text-foreground text-sm leading-relaxed">{result.recommendation}</p>
                </div>

                <button onClick={reset} className="w-full py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-sm flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> New Assessment
                </button>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl flex flex-col items-center justify-center min-h-[400px] text-center px-6">
                <ClipboardList className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground">Fill in the clinical features to receive an AI-powered preliminary screening result.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ClinicalPredictionForm;
