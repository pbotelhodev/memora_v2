/* eslint-disable react-hooks/incompatible-library */
import {
  Crown,
  Gem,
  Palette,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Zap,
  Star,
} from "lucide-react";
import { useForm } from "react-hook-form";
import CardPlan from "../../components/ui/CardPlan";

const CreatePlans = ({ onNext, onPrev }) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      plan_tier: "Pocket",
    },
  });

  const activePlan = watch("plan_tier");

  const handleChangePlan = (data) => {
    onNext(data)
  };

  return (
    <form
      className="w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 px-4 mt-10 pb-5"
      onSubmit={handleSubmit(handleChangePlan)}
    >
      {/* 1. CABEÇALHO */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Defina o Alcance da{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-cyan-400">
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
            <select
              className="w-full bg-transparent border-b border-white/5 py-3 pl-8 pr-8 text-white focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer text-base uppercase font-bold tracking-wider"
              {...register("plan_tier")}
            >
              <option value="Pocket" className="bg-slate-950 text-zinc-400">
                Pocket — R$ 29,90
              </option>
              <option value="Social" className="bg-slate-950 text-zinc-400">
                Social — R$ 59,90
              </option>
              <option
                value="Celebration"
                className="bg-slate-950 text-violet-400"
              >
                Celebration — R$ 99,90
              </option>
              <option
                value="Black"
                className="bg-slate-950 text-zinc-400"
              >
                Black — R$ 149,90
              </option>
              <option
                value="Infinity"
                className="bg-slate-950 text-emerald-400"
              >
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
        {activePlan === "Pocket" && (
          <CardPlan
            namePlan={"POCKET"}
            price={"29,90"}
            icon={Zap}
            guest={20}
            postWindow={1}
            galery={"7 Dias"}
            video={"A PARTE"}
            brand={"MEMORA"}
            theme={"amber"}
          />
        )}

        {/* --- 2. CARD SOCIAL (Ciano/Intermediário) --- */}
        {activePlan === "Social" && (
          <CardPlan
            namePlan={"SOCIAL"}
            price={"59,90"}
            icon={Palette}
            guest={50}
            postWindow={1}
            galery={"7 Dias"}
            video={"A PARTE"}
            brand={"MEMORA"}
            theme={"sky"}
          />
        )}

        {/* --- 3. CARD CELEBRATION (Roxo/Destaque) --- */}
        {activePlan === "Celebration" && (
          <CardPlan
            namePlan={"CELEBRATION"}
            price={"99,90"}
            icon={Crown}
            guest={120}
            postWindow={1}
            galery={"30 Dias"}
            video={"INCLUSO"}
            brand={"MEMORA"}
            theme={"violet"}
          />
        )}

        {/* --- 4. CARD BLACK (Opção 1: Obsidiana Polida) --- */}
        {activePlan === "Black" && (
          <CardPlan
            namePlan={"BLACK EDITION"}
            price={"149,90"}
            icon={Star}
            guest={250}
            postWindow={2}
            galery={"3 Meses"}
            video={"INCLUSO"}
            brand={"PERSONALIZADA"}
            theme={"black"}
          />
        )}

        {/* --- 5. CARD INFINITY (Esmeralda/Supremo) --- */}
        {activePlan === "Infinity" && (
          <CardPlan
            namePlan={"INFINITY"}
            price={"199,90"}
            icon={Gem}
            guest={"Ilimitados"}
            postWindow={14}
            galery={"6 Meses"}
            video={"INCLUSO"}
            brand={"PERSONALIZADA"}
            theme={"emerald"}
          />
        )}

        {/* 3. BOTÃO NEXT */}
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
            className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300"
            type="submit"
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
    </form>
  );
};

export default CreatePlans;
