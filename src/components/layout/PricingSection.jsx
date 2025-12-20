// src/components/layout/PricingSection.jsx

import React from "react";
import { Check, X, Crown, Zap, Shield, Star, Gem } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Pocket",
      icon: Zap,
      price: "29",
      cents: ",90",
      color: "text-gray-200",
      features: [
        { text: "20 Convidados", included: true },
        { text: "1 Dia de rede social ativa", included: true },
        { text: "7 Dias Galeria Online", included: true },
        // A MÁGICA AQUI: Separamos o nome do preço extra
        { text: "Vídeo", addon: "+ R$ 19,90", included: false },
        { text: "Personalização", included: false },
      ],
      highlight: false,
      badge: "Compacto",
    },
    {
      name: "Social",
      icon: Star,
      price: "59",
      cents: ",90",
      color: "text-blue-400",
      features: [
        { text: "50 Convidados", included: true },
        { text: "1 Dia de rede social ativa", included: true },
        { text: "7 Dias Galeria Online", included: true },
        { text: "Vídeo", addon: "+ R$ 19,90", included: false },
        { text: "Personalização", included: false },
      ],
      highlight: false,
      badge: "Casual",
    },
    {
      name: "Celebration",
      icon: Crown,
      price: "99",
      cents: ",90",
      color: "text-yellow-400",
      features: [
        { text: "120 Convidados", included: true },
        { text: "1 Dia de rede social ativa", included: true },
        { text: "30 Dias Galeria Online", included: true },
        { text: "Vídeo Melhores Momentos", included: true, bold: true },
        { text: "Cores Personalizadas", included: true },
      ],
      highlight: true,
      badge: "RECOMENDADO",
    },
    {
      name: "Black",
      icon: Shield,
      price: "149",
      cents: ",90",
      color: "text-gray-200",
      features: [
        { text: "250 Convidados", included: true },
        { text: "2 Dias rede social ativa", included: true },
        { text: "3 Meses Online", included: true },
        { text: "Vídeo Incluso", included: true },
        { text: "Marca Personalizada", included: true },
      ],
      highlight: false,
      badge: "VIP",
    },
    {
      name: "Infinity",
      icon: Gem,
      price: "199",
      cents: ",90",
      color: "text-cyan-400",
      features: [
        { text: "Ilimitado", included: true, bold: true },
        { text: "14 Dias rede social ativa", included: true },
        { text: "6 Meses Online", included: true },
        { text: "Vídeo Incluso", included: true },
        { text: "Marca Personalizada", included: true },
      ],
      highlight: false,
      badge: "Corporativo",
    },
  ];

  return (
    <section
      id="planos"
      className="bg-slate-950 py-24 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Planos simples, <br className="md:hidden" />
            <span className="font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-cyan-500">
              memórias eternas.
            </span>
          </h2>
          <p className="text-gray-200 text-lg">
            Valor único. Foco no agora: O que acontece na sua festa, fica na sua
            festa.
          </p>
        </div>

        {/* Grid de Planos */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 items-end">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative w-full rounded-2xl mt-3 md:mt-0 p-5 transition-all duration-300 border backdrop-blur-sm group
                ${
                  plan.highlight
                    ? "bg-slate-900/80 border-cyan-500/50 shadow-2xl shadow-cyan-900/10 lg:-translate-y-4 lg:py-12 z-10"
                    : "bg-slate-900/30 border-white/5 hover:border-white/10 hover:bg-slate-900/50"
                }
              `}
            >
              {/* Badge (Selo) */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                  {plan.badge}
                </div>
              )}

              {/* Cabeçalho do Card */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className={`p-3 rounded-xl bg-white/5 mb-4 ${plan.color}`}>
                  <plan.icon size={24} />
                </div>
                <h3 className="text-gray-300 font-medium text-sm uppercase tracking-wider mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-start justify-center text-white">
                  <span className="text-sm mt-1 mr-1">R$</span>
                  <span className="text-4xl font-bold tracking-tighter">
                    {plan.price}
                  </span>
                  <span className="text-sm mt-1 text-gray-500">
                    {plan.cents}
                  </span>
                </div>
              </div>

              {/* Separador */}
              <div className="w-full h-px bg-white/5 mb-6" />

              {/* Lista de Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    {/* Ícone: Check ou X */}
                    {feature.included ? (
                      <Check className="w-4 h-4 text-cyan-500 mr-3 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-slate-700 mr-3 shrink-0" />
                    )}

                    <div className="flex flex-wrap items-center gap-1">
                      {/* Texto Principal (Riscado se não incluso) */}
                      <span
                        className={`${
                          feature.included
                            ? "text-gray-300"
                            : "text-gray-600 line-through decoration-slate-700"
                        } ${feature.bold ? "font-bold text-white" : ""}`}
                      >
                        {feature.text}
                      </span>

                      {/* Texto Extra (Upsell) - NÃO RISCADO */}
                      {!feature.included && feature.addon && (
                        <span className="text-cyan-500 text-xs font-bold bg-cyan-950/30 px-1.5 py-0.5 rounded border border-cyan-500/20">
                          {feature.addon}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Botão */}
              <button
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer
                  ${
                    plan.highlight
                      ? "bg-white text-slate-950 hover:bg-cyan-50 shadow-lg shadow-white/10"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }
                `}
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
