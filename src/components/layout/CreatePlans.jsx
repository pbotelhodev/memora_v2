import React, { useState } from "react";
import {
  Check,
  X,
  Crown,
  Gem,
  Users,
  Video,
  Palette,
  Stamp,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Clock,
  Cloud,
  Zap,
  Star,
} from "lucide-react";

const CreatePlans = () => {
  const [activePlan, setActivePlan] = useState(1);

  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 px-4 mt-10 pb-5">
      {/* 1. CABEÇALHO */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Defina o Alcance da{" "}
          <span c lassName="text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-cyan-400">
            Sua Memória
          </span>
        </h2>
        <p className="text-zinc-500 text-sm">
          Escolha o plano ideal para o seu evento.
        </p>
      </div>

      <div className="space-y-5">
        {/* 2. O SELECT (Visual) */}
        <div className="group">
          <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1 ml-1">
            Selecione o Plano
          </label>

          <div className="relative">
            <Gem
              className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-violet-400"
              size={18}
            />
            <select className="w-full bg-transparent border-b border-white/5 py-3 pl-8 pr-8 text-white focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer text-base uppercase font-bold tracking-wider">
              <option className="bg-slate-950 text-zinc-400">
                Pocket — R$ 29,90
              </option>
              <option className="bg-slate-950 text-zinc-400">
                Social — R$ 59,90
              </option>
              <option className="bg-slate-950 text-violet-400" selected>
                Celebration — R$ 99,90
              </option>
              <option className="bg-slate-950 text-zinc-400">
                Black — R$ 149,90
              </option>
              <option className="bg-slate-950 text-emerald-400">
                Infinity — R$ 199,90
              </option>
            </select>
            <ChevronDown
              className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"
              size={16}
            />
          </div>
        </div>

        {/* --- 1. CARD POCKET (Azul/Básico) - REFERÊNCIA --- */}
        {activePlan === 1 && (
          <div className="relative p-5 rounded-2xl border border-white/10 bg-zinc-900/30 transition-all duration-500">
            {/* Header */}
            <div className="flex justify-between items-start mb-3 border-b border-white/5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-1 text-blue-400">
                  Pocket
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white tracking-tight">
                    R$ 29,90
                  </span>
                </div>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
                <Zap size={20} />
              </div>
            </div>
            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Users size={16} />{" "}
                  <span className="text-sm">Convidados</span>
                </div>
                <span className="font-bold text-white">20</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Clock size={16} /> <span className="text-sm">Postagem</span>
                </div>
                <span className="font-bold text-white">1 Dia</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Cloud size={16} />{" "}
                  <span className="text-sm">Galeria Online</span>
                </div>
                <span className="font-bold text-white">7 Dias</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500">
                  <Video size={16} /> <span className="text-sm">Vídeo</span>
                </div>
                <span className="text-amber-500 text-xs font-bold border border-amber-500/30 px-2 py-0.5 rounded">
                  EXTRA
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-3 text-zinc-500">
                  <Stamp size={16} /> <span className="text-sm">Marca</span>
                </div>
                <span className="text-zinc-600 text-xs font-bold">MEMORA</span>
              </div>
            </div>
          </div>
        )}

        {/* --- 2. CARD SOCIAL (Ciano/Intermediário) --- */}
        {activePlan === 2 && (
          <div className="relative p-5 rounded-2xl border border-white/10 bg-zinc-900/30 transition-all duration-500 hover:border-cyan-500/30">
            {/* Header Compacto */}
            <div className="flex justify-between items-start mb-3 border-b border-white/5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-1 text-cyan-400">
                  Social
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white tracking-tight">
                    R$ 59,90
                  </span>
                </div>
              </div>
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
                <Users size={20} />
              </div>
            </div>
            {/* Features Compactas (space-y-3) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Users size={16} />{" "}
                  <span className="text-sm">Convidados</span>
                </div>
                <span className="font-bold text-white">50</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Clock size={16} /> <span className="text-sm">Postagem</span>
                </div>
                <span className="font-bold text-white">1 Dia</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Cloud size={16} />{" "}
                  <span className="text-sm">Galeria Online</span>
                </div>
                <span className="font-bold text-white">7 Dias</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500">
                  <Video size={16} /> <span className="text-sm">Vídeo</span>
                </div>
                <span className="text-amber-500 text-xs font-bold border border-amber-500/30 px-2 py-0.5 rounded">
                  EXTRA
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-3 text-zinc-500">
                  <Stamp size={16} /> <span className="text-sm">Marca</span>
                </div>
                <span className="text-zinc-600 text-xs font-bold">MEMORA</span>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. CARD CELEBRATION (Roxo/Destaque) --- */}
        {activePlan === 3 && (
          <div className="relative p-5 rounded-2xl border border-violet-500/50 bg-violet-500/5 shadow-[0_0_40px_-10px_rgba(139,92,246,0.15)] transition-all duration-500">
            {/* Header Compacto */}
            <div className="flex justify-between items-start mb-3 border-b border-white/5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-1 text-violet-400">
                  Celebration
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white tracking-tight">
                    R$ 99,90
                  </span>
                </div>
              </div>
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
                <Crown size={20} />
              </div>
            </div>
            {/* Features Compactas (space-y-3) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Users size={16} className="text-violet-400" />{" "}
                  <span className="text-sm font-medium">Convidados</span>
                </div>
                <span className="font-bold text-white text-lg">120</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Clock size={16} className="text-violet-400" />{" "}
                  <span className="text-sm font-medium">Postagem</span>
                </div>
                <span className="font-bold text-white">1 Dia</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Cloud size={16} className="text-violet-400" />{" "}
                  <span className="text-sm font-medium">Galeria Online</span>
                </div>
                <span className="font-bold text-white">30 Dias</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Video size={16} className="text-violet-400" />{" "}
                  <span className="text-sm font-medium">Vídeo</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  INCLUSO
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-violet-500/20">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Stamp size={16} className="text-violet-400" />{" "}
                  <span className="text-sm font-medium">Marca</span>
                </div>
                <span className="text-violet-400 text-xs font-bold">
                  PERSONALIZADA
                </span>
              </div>
            </div>
          </div>
        )}

        {/* --- 4. CARD BLACK (Opção 1: Obsidiana Polida) --- */}
        {activePlan === 4 && (
          <div className="relative p-5 rounded-2xl border border-white/10 bg-zinc-950 transition-all duration-500 shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)] hover:border-white/20">
            {/* Header Compacto */}
            <div className="flex justify-between items-start mb-3 border-b border-white/5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-1 text-white">
                  Black Edition
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                    R$ 149,90
                  </span>
                </div>
              </div>
              <div className="p-2.5 bg-linear-to-br from-zinc-800 to-zinc-950 rounded-xl border border-white/10 text-white shadow-inner">
                <Star size={20} className="fill-white/20" />
              </div>
            </div>

            {/* Features Compactas (space-y-3) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <Users size={16} />{" "}
                  <span className="text-sm font-medium tracking-wide">
                    Convidados
                  </span>
                </div>
                <span className="font-bold text-white text-lg tracking-tight">
                  250
                </span>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <Clock size={16} />{" "}
                  <span className="text-sm font-medium tracking-wide">
                    Postagem
                  </span>
                </div>
                <span className="font-bold text-white">2 Dias</span>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <Cloud size={16} />{" "}
                  <span className="text-sm font-medium tracking-wide">
                    Galeria Online
                  </span>
                </div>
                <span className="font-bold text-white">3 Meses</span>
              </div>

              <div className="flex items-center justify-between group py-1">
                <div className="flex items-center gap-3 text-zinc-500 group-hover:text-white transition-colors">
                  <Video size={16} />{" "}
                  <span className="text-sm font-medium tracking-wide">
                    Vídeo
                  </span>
                </div>
                <span className="text-white text-[10px] font-bold bg-white/10 px-3 py-0.5 rounded-full border border-white/20 tracking-wider shadow-sm">
                  INCLUSO
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 group">
                <div className="flex items-center gap-3 text-zinc-500 group-hover:text-white transition-colors">
                  <Stamp size={16} />{" "}
                  <span className="text-sm font-medium tracking-wide">
                    Marca
                  </span>
                </div>
                <span className="text-white text-xs font-bold tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  PERSONALIZADA
                </span>
              </div>
            </div>
          </div>
        )}

        {/* --- 5. CARD INFINITY (Esmeralda/Supremo) --- */}
        {activePlan === 5 && (
          <div className="relative p-5 rounded-2xl border border-emerald-500/30 bg-emerald-900/10 transition-all duration-500">
            {/* Header Compacto */}
            <div className="flex justify-between items-start mb-3 border-b border-white/5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-1 text-emerald-400">
                  Infinity
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white tracking-tight">
                    R$ 199,90
                  </span>
                </div>
              </div>
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400 animate-pulse">
                <Gem size={20} />
              </div>
            </div>
            {/* Features Compactas (space-y-3) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-emerald-100">
                  <Users size={16} />{" "}
                  <span className="text-sm">Convidados</span>
                </div>
                <span className="font-bold text-emerald-400 text-lg">
                  ILIMITADO
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-emerald-100">
                  <Clock size={16} /> <span className="text-sm">Postagem</span>
                </div>
                <span className="font-bold text-white">14 Dias</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-emerald-100">
                  <Cloud size={16} />{" "}
                  <span className="text-sm">Galeria Online</span>
                </div>
                <span className="font-bold text-white">6 Meses</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-emerald-100">
                  <Video size={16} /> <span className="text-sm">Vídeo</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  INCLUSO
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20">
                <div className="flex items-center gap-3 text-emerald-100">
                  <Stamp size={16} /> <span className="text-sm">Marca</span>
                </div>
                <span className="text-violet-400 text-xs font-bold">
                  PERSONALIZADA
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. BOTÃO NEXT */}
        <div className="pt-6 flex justify-between">
          <button className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300">
            <div className="p-2 rounded-full border border-white/10 group-hover:border-cyan-500 group-hover:bg-cyan-500/10 transition-all duration-300">
              <ChevronLeft
                size={20}
                className="text-cyan-500 transition-transform group-hover:-translate-x-0.5"
              />
            </div>
            <span className="text-lg font-medium tracking-wide">Voltar</span>
          </button>
          <button className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300">
            <span className="text-lg font-medium tracking-wide">Próximo</span>
            <div className="p-2 rounded-full border border-white/10 group-hover:border-cyan-500 group-hover:bg-cyan-500/10 transition-all duration-300">
              <ChevronRight
                size={20}
                className="text-cyan-500 transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlans;