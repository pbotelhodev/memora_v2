import {
  Calendar,
  Clock,
  MapPin,
  PartyPopper,
  Type,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import LoadingOverlay from "../ui/LoadingOverlay";
import { useState } from "react";

import { useForm } from "react-hook-form";

const CreateEvent = ({ onNext }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,

    /* formState: { errors },
    getValues,
    reset, */
  } = useForm({
    defaultValues: {
      event_name: "", 
      category: "", 
      location: "", 
      event_date: "", 
      time_event: "",
    },
  });

  const handlePartyInfo = (data) => {
    setLoading(true);
    setTimeout(() => {
      
      setLoading(false);
      onNext(data);
    }, 2000);
  };
  return (
    <form
      onSubmit={handleSubmit(handlePartyInfo)}
      className="w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 px-4 mt-10"
    >
      {/* Cabeçalho Limpo */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Desenhe seu{" "}
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
              {...register("event_name", {
                required: "Insira o nome do seu evento.",
              })}
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

            <select
              className="w-full bg-transparent border-b border-white/10 py-3 pl-8 pr-6 text-white focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer text-base"
              {...register("category", {
                required: "Selecione a categoria.",
              })}
              
            >
              <option value="" disabled className="bg-slate-900 text-zinc-500">
                Selecione a vibe do evento...
              </option>
              <option
                value="viagem"
                className="bg-slate-900 text-zinc-100 py-2"
              >
                ✈️ Viagens, Churrascos & Social
              </option>
              <option
                value="aniversario"
                className="bg-slate-900 text-zinc-100 py-2"
              >
                🎂 Aniversários, Chás & Batizados
              </option>
              <option
                value="casamento"
                className="bg-slate-900 text-zinc-100 py-2"
              >
                💍 Casamentos & Bodas
              </option>
              <option value="show" className="bg-slate-900 text-zinc-100 py-2">
                🪩 Shows & Baladas
              </option>
              <option
                value="corporativo"
                className="bg-slate-900 text-zinc-100 py-2"
              >
                💼 Corporate & Business
              </option>
              <option
                value="outros"
                className="bg-slate-900 text-zinc-100 py-2"
              >
                🎲 Outros
              </option>
            </select>
          </div>
        </div>

        {/* 3. Grid Data e Hora */}

        <div className="grid grid-cols-12 gap-6">
          {/* Data */}

          <div className="group col-span-7">
            <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1 ml-1">
              Data
            </label>

            <div className="relative">
              <Calendar
                className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-violet-400"
                size={18}
              />

              <input
                {...register("event_date", {
                  required: "Selecione a data do evento.",
                })}
                type="date"
                className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white focus:outline-none focus:border-cyan-500 transition-all text-base schema-dark"
              />
            </div>
          </div>

          {/* Hora */}

          <div className="group col-span-5">
            <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1 ml-1">
              Horário
            </label>

            <div className="relative">
              <Clock
                className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-violet-400"
                size={18}
              />

              <input
                {...register("time_event", {
                  required: "Selecione o horário do evento.",
                })}
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
              {...register("location")}
              placeholder="Ex: Espaço Garden..."
              className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500 transition-all text-base"
            />
          </div>
        </div>

        {/* Botão Next Minimalista */}

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300"
          >
            <span className="text-lg font-medium tracking-wide">Próximo</span>

            <div className="p-2 rounded-full border border-white/10 group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-300">
              <ChevronRight
                size={20}
                className="text-cyan-500 transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </button>
        </div>
      </div>
      {loading && <LoadingOverlay />}
    </form>
  );
};

export default CreateEvent;
