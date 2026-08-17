import { Brain } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Brain className="w-5 h-5 text-primary" />
        <span className="font-display font-bold gradient-text">NeuroDetect AI</span>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()} NeuroDetect AI — AI-Powered Alzheimer's Detection System. For research & educational purposes only.
      </p>
    </div>
  </footer>
);

export default Footer;
