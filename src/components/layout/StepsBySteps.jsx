// src/components/layout/StepsBySteps.jsx

import React from "react";
import { CalendarPlus, QrCode, Share2, Tv } from "lucide-react";

const StepsBySteps = () => {
  const steps = [
    {
      id: 1,
      title: "Crie seu evento",
      description:
        "Cadastre sua festa em segundos e personalize os detalhes do seu painel.",
      icon: CalendarPlus,
    },
    {
      id: 2,
      title: "Gere o QR Code",
      description:
        "O sistema cria automaticamente o código de acesso exclusivo da sua rede social.",
      icon: QrCode,
    },
    {
      id: 3,
      title: "Compartilhe",
      description:
        "Imprima para colocar nas mesas ou envie o link direto no convite digital.",
      icon: Share2,
    },
    {
      id: 4,
      title: "Brilhe no Telão",
      description:
        "Seus convidados escaneiam, postam e a mágica acontece ao vivo na TV.",
      icon: Tv,
    },
  ];

  return (
    <section
      id="funcionalidades"
      className="bg-slate-900 py-20 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            <span className="font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-cyan-500">
              Como funciona a mágica?
            </span>
          </h2>
          <h3 className="text-gray-400 text-lg md:text-xl font-medium">
            Do cadastro ao show em 4 passos simples.
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-900/20"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-800/80 flex items-center justify-center mb-4 group-hover:bg-cyan-950/30 group-hover:text-cyan-400 transition-colors duration-300">
                <step.icon className="w-7 h-7 md:w-8 md:h-8 text-white transition-colors duration-300 group-hover:text-cyan-400" />
              </div>

              <h4 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                <span className="text-cyan-500 mr-2">{step.id}.</span>
                {step.title}
              </h4>

              <p className="text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsBySteps;
