import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Activity, TrendingUp, Users, FileImage } from "lucide-react";

const barData = [
  { name: "Normal", value: 312 },
  { name: "Very Mild", value: 245 },
  { name: "MCI", value: 189 },
  { name: "Alzheimer's", value: 134 },
];

const pieData = [
  { name: "Normal", value: 35 },
  { name: "Very Mild", value: 28 },
  { name: "MCI", value: 22 },
  { name: "Alzheimer's", value: 15 },
];

const PIE_COLORS = ["#22c55e", "#eab308", "#f97316", "#ef4444"];

const kpis = [
  { icon: FileImage, label: "Scans Analyzed", value: "880" },
  { icon: Activity, label: "Model Accuracy", value: "96.4%" },
  { icon: TrendingUp, label: "F1-Score", value: "0.94" },
  { icon: Users, label: "Patients Screened", value: "612" },
];

const recentPredictions = [
  { id: "MRI-0041", stage: "Normal", confidence: 97.2, time: "2 min ago" },
  { id: "MRI-0040", stage: "MCI", confidence: 88.1, time: "14 min ago" },
  { id: "MRI-0039", stage: "Very Mild", confidence: 73.5, time: "1 hr ago" },
  { id: "MRI-0038", stage: "Alzheimer's", confidence: 91.0, time: "3 hr ago" },
];

const stageClass: Record<string, string> = {
  Normal: "stage-normal",
  "Very Mild": "stage-mild",
  MCI: "stage-mci",
  "Alzheimer's": "stage-alzheimer",
};

const DashboardSection = () => (
  <section id="dashboard" className="py-24 neural-bg relative">
    <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="font-display text-4xl font-bold gradient-text mb-3">Analytics Dashboard</h2>
        <p className="text-muted-foreground max-w-md mx-auto">Model performance metrics and prediction history at a glance.</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <k.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-display text-xl font-bold text-foreground">{k.value}</p>
              <p className="text-xs text-muted-foreground">{k.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-foreground mb-4">Classification Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(222 40% 10%)", border: "1px solid hsl(222 30% 18%)", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="url(#barGrad)" />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217 91% 60%)" />
                  <stop offset="100%" stopColor="hsl(270 60% 55%)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 flex flex-col items-center">
          <h3 className="font-display font-semibold text-foreground mb-4 self-start">Stage Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(222 40% 10%)", border: "1px solid hsl(222 30% 18%)", borderRadius: 8, color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {pieData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                {d.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent predictions table */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 mt-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Recent Predictions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-left border-b border-border">
                <th className="pb-3 font-medium">Scan ID</th>
                <th className="pb-3 font-medium">Stage</th>
                <th className="pb-3 font-medium">Confidence</th>
                <th className="pb-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((p) => (
                <tr key={p.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 text-foreground font-mono">{p.id}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${stageClass[p.stage]}`}>{p.stage}</span>
                  </td>
                  <td className="py-3 text-foreground">{p.confidence}%</td>
                  <td className="py-3 text-muted-foreground">{p.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  </section>
);

export default DashboardSection;
