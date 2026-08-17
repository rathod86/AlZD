import { motion } from "framer-motion";
import { ArrowDown, Shield, Zap, Activity } from "lucide-react";
import heroBrain from "@/assets/hero-brain.png";

const stats = [
  { icon: Shield, label: "Accuracy", value: "96.4%" },
  { icon: Zap, label: "Prediction", value: "<2s" },
  { icon: Activity, label: "Stages", value: "4 Classes" },
];

const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex items-center neural-bg overflow-hidden pt-20">
    {/* Ambient glow orbs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      {/* Left */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 border border-accent/30 rounded-full px-4 py-1">
          Deep Learning · Healthcare AI
        </span>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="gradient-text">Alzheimer's</span>{" "}
          <span className="text-foreground">Disease Detection</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed">
          Upload an MRI brain scan and our CNN-powered AI instantly classifies the cognitive stage — from Normal to Alzheimer's — with Grad-CAM explainability.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          <a href="#upload" className="btn-primary-glow px-8 py-3 rounded-xl font-semibold text-primary-foreground text-base">
            Upload MRI Scan
          </a>
          <a href="#info" className="glass-card px-8 py-3 rounded-xl font-semibold text-foreground text-base hover:border-primary/40 transition-colors">
            Learn More
          </a>
        </div>

        <div className="flex gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right – 3D Brain */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative flex justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-primary/5 blur-[80px]" />
        <img
          src={heroBrain}
          alt="3D brain visualization for Alzheimer's detection"
          width={1024}
          height={1024}
          className="relative w-full max-w-lg float-animation drop-shadow-[0_0_60px_hsla(217,91%,60%,0.3)]"
        />

        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-10 right-4 glass-card px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-stage-normal animate-pulse" />
          <span className="text-xs font-semibold text-foreground">AI Model Active</span>
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <ArrowDown className="w-5 h-5 text-muted-foreground" />
    </motion.div>
  </section>
);

export default HeroSection;
