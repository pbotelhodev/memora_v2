// src/components/LiveFeed.jsx

import exampleView from "../../assets/exempleView.png";

const LiveFeed = () => {
  return (
    <section className="bg-slate-900 py-15">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-500">
            Telão Ao Vivo
          </span>
        </h2>

        <h3 className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-15">
          As fotos chegam do celular dos seus convidados direto para o telão, em
          tempo real.
        </h3>

        <div className="w-full bg-slate-800 rounded-2xl shadow-[0_0_10px_3px_rgba(6,182,212,0.2)] flex itens-center justify-center">
          <img src={exampleView} alt="" className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

export default LiveFeed;
