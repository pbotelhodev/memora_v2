import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
  CheckCircle2,
  Gem,
  Lock,
  Zap,
  Palette,
  Star,
  Crown,
} from "lucide-react";
import { nanoid } from "nanoid";
import LoadingOverlay from "../ui/LoadingOverlay";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ReviewPlan = ({ formData, onNext, onPrev }) => {
  const [loading, setLoading] = useState(false);
  const [randomSlug] = useState(() => nanoid(10));

  const activePlan = {
    nome: formData.event_name,
    data: formData.event_date,
    location: formData.location,
    plano: formData.plan_tier,
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      slug: formData.slug || "",
    },
  });

  const plansInfo = {
    Infinity: {
      name: "Infinity",
      value: "R$ 199,90",
      icon: Gem,
      // Classes completas aqui:
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
    },
    Black: {
      name: "Black Edition",
      value: "R$ 149,90",
      icon: Crown,
      bg: "bg-zinc-500/10",
      border: "border-zinc-500/20",
      text: "text-zinc-400",
    },
    Celebration: {
      name: "Celebration",
      value: "R$ 99,90",
      icon: Star,
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      text: "text-violet-400",
    },
    Social: {
      name: "Social",
      value: "R$ 59,90",
      icon: Palette,
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-400",
    },
    Pocket: {
      name: "Pocket",
      value: "R$ 29,90",
      icon: Zap,
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-400",
    },
  };

  const PlanIcon = plansInfo[activePlan.plano].icon;
  const currentPlan = plansInfo[activePlan.plano];

  const slugFree =
    activePlan.plano === "Infinity" || activePlan.plano === "Black";

  //Seta o slug no objeto
  const setPlan = (data) => {
    setLoading(true);

    const finalSlug = slugFree ? data.slug : randomSlug;
    onNext({
      ...formData,
      slug: finalSlug,
    });

    setLoading(false);
  };

  return (
    // ESTRUTURA FIXA (LOCK SCREEN) - SEM BG-ZINC-950
    <form
      onSubmit={handleSubmit(setPlan)}
      className="w-full max-w-lg mx-auto px-4  flex flex-col justify-between overflow-hidden py-6"
    >
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
              <h3 className="text-lg font-bold text-white">
                {activePlan.nome}
              </h3>
              <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                <div className="flex items-center gap-1">
                  <Calendar size={12} /> <span>{activePlan.data}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} /> <span>{activePlan.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Linha 2: Plano Selecionado */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg border ${currentPlan.bg} ${currentPlan.border} ${currentPlan.text}`}
              >
                <PlanIcon size={20} />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                  Plano Escolhido
                </span>
                <span className="text-sm font-bold text-white">
                  {plansInfo[activePlan.plano].name}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xl font-bold text-white">
                {plansInfo[activePlan.plano].value}
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
          {slugFree && (
            <div className="relative">
              <div className="flex items-center w-full border-b border-white/10 py-3 focus-within:border-emerald-400 transition-colors group-hover:border-white/20">
                <span className="text-zinc-500 text-base font-medium mr-0.5">
                  memora.com/
                </span>
                <input
                  {...register("slug", {
                    required: "Personalize o link do seu evento.",
                  })}
                  type="text"
                  placeholder="Seu-evento"
                  className="bg-transparent text-white placeholder-zinc-700 focus:outline-none w-full text-base font-bold tracking-wide"
                />

                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 whitespace-nowrap">
                  <CheckCircle2 size={10} /> LIVRE
                </div>
              </div>
              <p
                className={`text-[10px] ${
                  currentPlan.name === "Black Edition"
                    ? "text-yellow-400"
                    : currentPlan.text
                } mt-2 ml-1 flex items-center gap-1`}
              >
                <Gem size={10} /> Benefício {activePlan.plano}: O link pode ser
                personalizado.
              </p>
            </div>
          )}

          {!slugFree && (
            <div className="relative opacity-70">
              <div className="flex items-center w-full border-b border-white/5 py-3 border-dashed">
                <span className="text-zinc-600 text-base font-medium mr-1">
                  memora.com/
                </span>
                <span className="text-zinc-500 text-base font-bold tracking-wide italic">
                  {randomSlug}
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
      <div className="pt-6 flex justify-between">
        <button
          type="button"
          className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300"
          onClick={onPrev}
        >
          <div className="p-2 rounded-full border border-white/10 group-hover:border-cyan-500 group-hover:bg-cyan-500/10 transition-all duration-300">
            <ChevronLeft
              size={20}
              className="text-cyan-500 transition-transform group-hover:-translate-x-0.5"
            />
          </div>
          <span className="text-lg font-medium tracking-wide">Voltar</span>
        </button>
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
      {loading && <LoadingOverlay />}
    </form>
  );
};

export default ReviewPlan;
