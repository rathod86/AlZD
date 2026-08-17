import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Layers } from "lucide-react";

type Props = {
  preview: string;
};

/**
 * Simulated Grad-CAM heatmap overlay.
 * In production, the backend would return a real heatmap image.
 */
const GradCAMVisualization = ({ preview }: Props) => {
  const [opacity, setOpacity] = useState(0.55);
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-2xl p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-accent" />
          <p className="text-sm font-medium text-foreground">Grad-CAM Heatmap</p>
        </div>
        <button
          onClick={() => setShowOverlay((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {showOverlay ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {showOverlay ? "Hide" : "Show"}
        </button>
      </div>

      {/* Image with heatmap overlay */}
      <div className="relative rounded-xl overflow-hidden aspect-square max-h-64 mx-auto">
        <img src={preview} alt="MRI scan" className="w-full h-full object-contain bg-black/40" />
        {showOverlay && (
          <div
            className="absolute inset-0 mix-blend-screen pointer-events-none"
            style={{ opacity }}
          >
            {/* Simulated heatmap using radial gradients */}
            <div
              className="w-full h-full"
              style={{
                background: `
                  radial-gradient(ellipse 35% 40% at 55% 45%, hsla(0,90%,50%,0.9) 0%, hsla(30,95%,50%,0.6) 30%, hsla(60,90%,50%,0.3) 55%, transparent 75%),
                  radial-gradient(ellipse 20% 25% at 40% 38%, hsla(0,85%,55%,0.7) 0%, hsla(45,90%,50%,0.3) 50%, transparent 70%),
                  radial-gradient(ellipse 15% 18% at 62% 55%, hsla(15,90%,50%,0.5) 0%, hsla(50,80%,50%,0.2) 50%, transparent 70%)
                `,
              }}
            />
          </div>
        )}
      </div>

      {/* Opacity slider */}
      {showOverlay && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Overlay Intensity</span>
            <span>{Math.round(opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary bg-muted"
          />
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 pt-1">
        <div
          className="h-2.5 flex-1 rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(240,60%,50%), hsl(185,80%,50%), hsl(120,70%,50%), hsl(60,90%,55%), hsl(30,95%,50%), hsl(0,90%,50%))",
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground -mt-2">
        <span>Low activation</span>
        <span>High activation</span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Highlighted regions indicate areas the model focused on most during classification. Red zones show strongest neural activation.
      </p>
    </motion.div>
  );
};

export default GradCAMVisualization;
