
import { Gem, Users, Video, Clock, Cloud, Stamp } from "lucide-react";

const CardPlan = ({
  namePlan,
  price,
  icon: Icon,
  guest,
  postWindow,
  galery,
  video,
  brand,
  theme = "emerald", // Fallback para não quebrar se esquecerem a prop
}) => {
  const themes = {
    emerald: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-900/5",
      shadow: "shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]",
      text: "text-emerald-400",
      accent: "text-emerald-200", // Cor suave para ícones menores
    },
    black: {
      border: "border-white/10",
      bg: "bg-zinc-900/50",
      shadow: "shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]",
      text: "text-zinc-100",
      accent: "text-zinc-400",
    },
    violet: {
      border: "border-violet-500/30",
      bg: "bg-violet-900/5",
      shadow: "shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]",
      text: "text-violet-400",
      accent: "text-violet-200",
    },
    sky: {
      border: "border-cyan-500/30",
      bg: "bg-cyan-900/5",
      shadow: "shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]",
      text: "text-cyan-400",
      accent: "text-cyan-200",
    },
    amber: {
      border: "border-amber-500/30",
      bg: "bg-amber-900/5",
      shadow: "shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]",
      text: "text-amber-400",
      accent: "text-amber-200",
    },
  };

  // Atalho para não precisar digitar themes[theme] toda hora
  const style = themes[theme] || themes.emerald;

  return (
    <div
      className={`relative p-5 rounded-2xl transition-all duration-500 border ${style.border} ${style.bg} ${style.shadow}`}
    >
      {/* Header Compacto */}
      <div className="flex justify-between items-start mb-3 border-b border-white/5 pb-3">
        <div>
          <h3
            className={`text-xs font-bold uppercase tracking-[0.2em] mb-1 ${style.text}`}
          >
            {namePlan}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white tracking-tight">
              R$ {price}
            </span>
          </div>
        </div>
        <div
          className={`p-2 ${style.bg} rounded-lg border ${style.border} ${style.text} animate-pulse`}
        >
          {Icon && <Icon size={20} />}
        </div>
      </div>

      {/* Features Compactas */}
      <div className="space-y-2">
        {/* Convidados */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${style.accent}`}>
            <Users size={16} /> <span className="text-sm">Convidados</span>
          </div>
          <span className={`font-bold text-lg ${style.text}`}>{guest}</span>
        </div>

        {/* Postagem */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${style.accent}`}>
            <Clock size={16} /> <span className="text-sm">Postagem</span>
          </div>
          <span className="font-bold text-white text-sm">
            {postWindow} Dia(s)
          </span>
        </div>

        {/* Galeria */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${style.accent}`}>
            <Cloud size={16} /> <span className="text-sm">Galeria Online</span>
          </div>
          <span className="font-bold text-white text-sm">{galery}</span>
        </div>

        {/* Vídeo */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${style.accent}`}>
            <Video size={16} /> <span className="text-sm">Vídeo</span>
          </div>
          <span
            className={`${style.text} text-[12px] font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10`}
          >
            {video}
          </span>
        </div>

        {/* Marca / Branding */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className={`flex items-center gap-3 ${style.accent}`}>
            <Stamp size={16} /> <span className="text-sm">Marca</span>
          </div>
          <span className="text-violet-400 text-xs font-bold">{brand}</span>
        </div>
      </div>
    </div>
  );
};

export default CardPlan;
