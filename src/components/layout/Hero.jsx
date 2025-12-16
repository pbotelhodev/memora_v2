// src/components/Hero.jsx (VERSÃO OTIMIZADA)

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    // 1. CONTAINER GERAL: Fundo e Centralização
    <section className="bg-slate-900 min-h-screen md:min-h-[80vh] xl:min-h-[90vh] flex items-center justify-center">
      <div className="pt-20 md:pt-30  max-w-6xl mx-auto px-4 py-12 text-center">
        {/* TÍTULO PRINCIPAL*/}
        <h1 className="text-4xl md:text-6xl max-w-3xl mx-auto font-semibold mb-6 leading-tight">
          {/* O span recebe as classes de gradiente e clipagem */}A Rede Social{" "}
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-500">
            Exclusiva Do Seu Evento
          </span>
        </h1>

        {/*  SUBTÍTULO  */}
        <p className="font-light text-slate-200 text-1xl md:text-2xl max-w-2xl md:max-w-3xl mx-auto mb-16">
          A interação que faltava na sua festa. Um feed exclusivo e em tempo
          real, feito para conectar seus convidados e eternizar cada momento.
        </p>
        {/* Botão CTA  */}
        <Link
          to="/app/criar"
          className="inline-flex items-center space-x-2 px-10 py-4 text-md font-bold text-white 
         bg-gradient-to-r from-violet-600 to-cyan-500 shadow-[0_0_10px_0_rgba(59,130,246,0.2)] rounded-xl 
         transition duration-300 hover:opacity-90 transform hover:scale-[1.02]"
        >
          Criar minha festa agora
          <ArrowRight className="w-6 h-6 ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
