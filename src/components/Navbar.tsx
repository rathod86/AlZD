import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Upload", href: "#upload" },
  { label: "Clinical", href: "#clinical" },
  { label: "Symptoms", href: "#symptoms" },
  { label: "Brain Map", href: "#brain-regions" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "About", href: "#info" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-2">
          <Brain className="h-7 w-7 text-primary" />
          <span className="font-display text-lg font-bold gradient-text">NeuroDetect AI</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#upload" className="btn-primary-glow px-5 py-2 rounded-lg text-sm font-semibold text-primary-foreground">
            Start Analysis
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:hidden glass-card border-t border-border/50 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
