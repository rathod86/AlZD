import { motion } from "framer-motion";
import { Brain, AlertTriangle, HeartPulse, Search } from "lucide-react";

const cards = [
  {
    icon: Brain,
    title: "What is Alzheimer's?",
    body: "Alzheimer's disease is a progressive neurodegenerative disorder that destroys memory and cognitive function. It is the most common cause of dementia, accounting for 60-80% of cases worldwide.",
  },
  {
    icon: AlertTriangle,
    title: "Common Symptoms",
    body: "Memory loss that disrupts daily life, challenges in planning or solving problems, difficulty completing familiar tasks, confusion with time or place, and changes in mood and personality.",
  },
  {
    icon: HeartPulse,
    title: "Disease Stages",
    body: "The disease progresses through stages: Normal cognition → Very Mild Impairment → Mild Cognitive Impairment (MCI) → Alzheimer's Disease. Each stage shows increasing hippocampal atrophy visible on MRI.",
  },
  {
    icon: Search,
    title: "Why Early Detection Matters",
    body: "Early diagnosis allows access to treatments that may slow progression, clinical trial enrollment, financial and legal planning, and time for families to prepare care strategies.",
  },
];

const InfoSection = () => (
  <section id="info" className="py-24 neural-bg relative">
    <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="font-display text-4xl font-bold gradient-text mb-3">Understanding Alzheimer's</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Knowledge is the first step toward early intervention. Learn about the disease, its progression, and how AI can help.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-8 hover:border-primary/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <c.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">{c.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default InfoSection;
