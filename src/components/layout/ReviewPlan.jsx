
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
  CheckCircle2, 
  Gem,
  Lock,
} from "lucide-react";

const ReviewPlans = () => {
  const infinityPlan = true
  const linkEvento = "aSJKDJW22"

  return (
    // ESTRUTURA FIXA (LOCK SCREEN) - SEM BG-ZINC-950
    <div className="w-full max-w-lg mx-auto px-4  flex flex-col justify-between overflow-hidden py-6">
      {/* 1. CABEÇALHO */}
      <div className="flex-none text-center mb-4">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Revisão do{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-cyan-400">
            Pedido
          </span>
        </h2>
        <p className="text-zinc-500 text-sm">
          Confira os detalhes e crie seu link.
        </p>
      </div>

      {/* 2. CONTEÚDO CENTRAL (Scrollável se necessário) */}
      <div className="flex-1 flex flex-col justify-center gap-8 w-full px-1">
        {/* BLOCO A: RESUMO DO EVENTO (Visual Ticket) */}
        <div className="relative p-5 rounded-2xl border border-white/10 bg-zinc-900/30">
          {/* Linha 1: Evento */}
          <div className="flex items-start justify-between mb-4 border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest block mb-1">
                Evento
              </span>
              <h3 className="text-lg font-bold text-white">Casamento P&M</h3>
              <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                <div className="flex items-center gap-1">
                  <Calendar size={12} /> <span>24/10/2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} /> <span>Espaço Garden</span>
                </div>
              </div>
            </div>
          </div>

          {/* Linha 2: Plano Selecionado */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                <Gem size={20} />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                  Plano Escolhido
                </span>
                <span className="text-sm font-bold text-white">Infinity</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xl font-bold text-white">
                R$ 199,90
              </span>
            </div>
          </div>
        </div>

        {/* BLOCO B: INPUT DE LINK (Estilo Input Borda Inferior) */}
        <div className="group">
          <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2 ml-1 items-center gap-2">
            <LinkIcon size={12} />
            Link do Evento
          </label>

          {/* --- CENÁRIO 1: PLANO INFINITY (Pode editar) --- */}
          {infinityPlan && (
            <div className="relative">
              <div className="flex items-center w-full border-b border-white/10 py-3 focus-within:border-emerald-400 transition-colors group-hover:border-white/20">
                <span className="text-zinc-500 text-base font-medium mr-0.5">
                  memora.com/
                </span>
                <input
                  type="text"
                  placeholder="seu-evento"
                  className="bg-transparent text-white placeholder-zinc-700 focus:outline-none w-full text-base font-bold tracking-wide uppercase"
                />
                {/* Badge "Livre" */}
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 whitespace-nowrap">
                  <CheckCircle2 size={10} /> LIVRE
                </div>
              </div>
              <p className="text-[10px] text-emerald-400/70 mt-2 ml-1 flex items-center gap-1">
                <Gem size={10} /> Benefício Infinity: O link pode ser personalizado.
              </p>
            </div>
          )}
        {!infinityPlan && (
            <div className="relative opacity-70">
                <div className="flex items-center w-full border-b border-white/5 py-3 border-dashed">
                   <span className="text-zinc-600 text-base font-medium mr-1">memora.com/</span>
                   <span className="text-zinc-500 text-base font-bold tracking-wide italic">
                        {linkEvento}
                   </span>
                   <Lock size={14} className="text-zinc-600 ml-auto" />
                </div>
                <p className="text-[10px] text-zinc-500 mt-2 ml-1">
                   O link será liberado após o pagamento.
                </p>
           </div>
        )}
        
        </div>

        {/* BLOCO C: NOTA DE RODAPÉ */}
        <div className="px-1 p-4 rounded-xl bg-zinc-900/20 border border-white/5">
          <p className="text-xs text-zinc-500 text-center leading-relaxed">
            Após o pagamento, você terá acesso imediato ao{" "}
            <span className="text-white font-bold">Painel do Organizador</span>{" "}
            para configurar cores e convidados.
          </p>
        </div>
      </div>

      {/* 3. RODAPÉ / BOTÕES */}
      <div className="flex-none pt-4 flex justify-between">
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
          <span className="text-lg font-medium tracking-wide">Pagamento</span>
          <div className="p-2 rounded-full border border-white/10 group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-300">
            <ChevronRight
              size={20}
              className="text-emerald-500 transition-transform group-hover:translate-x-0.5"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ReviewPlans;
