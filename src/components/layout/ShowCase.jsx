// src/components/ShowCase.jsx

import React from "react";
import feed from "../../assets/mockup-feed.png";
import camera from "../../assets/mockup-camera.png";
import perfil from "../../assets/mockup-perfil.png";

const ShowCase = () => {
  const baseMockupWrapper =
    "shadow-2xl transition duration-500 hover:scale-[1.01]";
  const highlightMockupWrapper =
    "shadow-2xl md:scale-[0.9] md:z-10 relative transition duration-500";

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
          Experiência Mobile
        </h2>
        <h3 className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-10">
          Seus convidados acessam pelo celular e compartilham momentos em tempo
          real.
        </h3>
        <div className="scale-[0.9] md:scale-[1] md:flex md:justify-center md:space-x-12 space-y-12 md:space-y-0 items-center">
          <div className="w-full md:w-1/5">
            <div className={baseMockupWrapper}>
              <img
                src={feed}
                alt="Mockup da Timeline do App Memora"
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <div className={highlightMockupWrapper}>
              <img
                src={camera}
                alt="Mockup da Câmera do App Memora"
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </div>
          <div className="w-full md:w-1/5">
            <div className={baseMockupWrapper}>
              <img
                src={perfil}
                alt="Mockup do Perfil do Convidado do App Memora"
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </div>
        </div>

        <p className="text-white text-3xl font-semibold mt-20 md:mt-32 max-w-4xl mx-auto">
          ✨ A experiência social que seus convidados já dominam
        </p>
      </div>
    </section>
  );
};

export default ShowCase;
