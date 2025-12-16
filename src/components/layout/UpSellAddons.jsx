// src/components/layout/UpsellAddons.jsx

import React from "react";
import { Plus, UserPlus, CalendarClock, Film, History } from "lucide-react";

const UpsellAddons = () => {
  const addons = [
    {
      title: "+ 1 Dia de Festa",
      price: "R$ 19,90",
      unit: "/ dia",
      description: "Aumenta a janela de postagem (ex: fim de semana inteiro).",
      icon: CalendarClock,
    },
    {
      title: "+ 30 Dias de Galeria",
      price: "R$ 14,90",
      unit: "/ mês",
      description: "Mantém o site no ar por mais tempo para visitas.",
      icon: History,
    },
    {
      title: "Pacote Vídeo",
      price: "R$ 19,90",
      unit: "/ evento",
      description: "Libera uploads de vídeos curtos no telão.",
      icon: Film,
    },
    {
      title: "+ 10 Convidados",
      price: "R$ 14,90",
      unit: "/ bloco",
      description: "Para ajustes finos (ex: tem 25 convidados).",
      icon: UserPlus,
    },
  ];

  return (
    <section className="bg-slate-950 pb-24 pt-0 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 pt-16">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Plus className="text-cyan-500" />
              Precisa de algo específico?
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Personalize seu pacote com itens avulsos.
            </p>
          </div>

          {/* Opcional: Um botão de "Falar com Consultor" poderia vir aqui */}
        </div>

        {/* Grid de Addons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {addons.map((item, index) => (
            <div
              key={index}
              className="group bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:bg-slate-900/80 hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-slate-800 rounded-lg text-gray-300 group-hover:text-cyan-400 group-hover:bg-cyan-950/30 transition-colors">
                  <item.icon size={20} />
                </div>
                <div className="text-right">
                  <span className="block font-bold text-white text-lg">
                    {item.price}
                  </span>
                  <span className="text-xs text-gray-500">{item.unit}</span>
                </div>
              </div>

              <h4 className="font-semibold text-gray-200 mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpsellAddons;
