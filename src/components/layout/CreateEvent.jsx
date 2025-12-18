import {
  Calendar,
  Clock,
  MapPin,
  PartyPopper,
  Type,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const CreateEvent = () => {
  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 px-4 mt-10">
      <style>{`
        ::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
          cursor: pointer;
        }
      `}</style>
      
      {/* Cabeçalho Limpo */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Desenha sua{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-cyan-400">
            Momento
          </span>
        </h2>

        <p className="text-zinc-500 text-sm">
          Detalhes essenciais do seu evento.
        </p>
      </div>

      <div className="space-y-8">
        {/* 1. Nome do Evento */}

        <div className="group">
          <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1 ml-1">
            Nome do Evento
          </label>

          <div className="relative">
            <Type
              className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-violet-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Ex: Casamento P&M..."
              className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500 transition-all text-base"
            />
          </div>
        </div>

        {/* 2. Categoria */}

        <div className="group">
          <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1 ml-1">
            Categoria
          </label>

          <div className="relative">
            <PartyPopper
              className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-violet-400"
              size={18}
            />

            <ChevronDown
              className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"
              size={16}
            />

            <select className="w-full bg-transparent border-b border-white/10 py-3 pl-8 pr-6 text-white focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer text-base">
              <option value="" className="bg-slate-950 text-zinc-500">
                Selecione...
              </option>

              <option value="aniversario" className="bg-slate-900">
                Aniversário
              </option>

              <option value="casamento" className="bg-slate-900">
                Casamento
              </option>

              <option value="corporativo" className="bg-slate-900">
                Corporativo
              </option>

              <option value="outros" className="bg-slate-900">
                Outros
              </option>
            </select>
          </div>
        </div>

        {/* 3. Grid Data e Hora */}

        <div className="grid grid-cols-2 gap-6">
          {/* Data */}

          <div className="group">
            <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1 ml-1">
              Data
            </label>

            <div className="relative">
              <Calendar
                className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-violet-400"
                size={18}
              />

              <input
                type="date"
                className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white focus:outline-none focus:border-cyan-500 transition-all text-base schema-dark"
              />
            </div>
          </div>

          {/* Hora */}

          <div className="group">
            <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1 ml-1">
              Horário
            </label>

            <div className="relative">
              <Clock
                className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-violet-400"
                size={18}
              />

              <input
                type="time"
                className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white focus:outline-none focus:border-cyan-500 transition-all text-base schema-dark"
              />
            </div>
          </div>
        </div>

        {/* 4. Local */}

        <div className="group">
          <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1 ml-1">
            Local
          </label>

          <div className="relative">
            <MapPin
              className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-violet-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Ex: Espaço Garden..."
              className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500 transition-all text-base"
            />
          </div>
        </div>

        {/* Botão Next Minimalista */}

        <div className="pt-10 flex justify-end">
          <button
            type="submit"
            className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300"
          >
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

export default CreateEvent;
