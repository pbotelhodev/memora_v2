// src/components/ShowCase.jsx

import React from "react";
import feed from "../../assets/mockup-feed.png";
import camera from "../../assets/mockup-camera.png";
import perfil from "../../assets/mockup-perfil.png";

const ShowCase = () => {
  const baseMockupWrapper =
    "transition duration-500 hover:scale-[1.08] space-y-5 font-semibold";
  const highlightMockupWrapper =
    "md:scale-[0.9] md:z-10 relative transition duration-500 md:hover:scale-[0.95] space-y-5 font-semibold";
  const textSubtitle = "text-gray-200 text-[14px]"

  return (
    <section className="bg-slate-950 py-15 ">
      <div className="max-w-7xl mx-auto px-4 text-center ">
        <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-4 ">
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-500">
            Experiência Mobile
          </span>
        </h2>
        <h3 className=" text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-1 md:mb-10">
          Seus convidados acessam pelo celular e compartilham os momentos em tempo
          real.
        </h3>
        <div className="scale-[0.9] md:scale-[1] md:max-w-6xl mx-auto px-4 md:flex md:justify-between md:space-x-12 space-y-12 md:space-y-0 items-center">
          <div className="w-full md:w-60">
            <div className={baseMockupWrapper}>
              <img
                src={feed}
                alt="Mockup da Timeline do App Memora"
                className="w-full h-auto rounded-3xl shadow-[0_0_10px_3px_rgba(6,182,212,0.2)]"
              />
              <h1 className={textSubtitle}>Feed</h1>
            </div>
          </div>
          <div className="w-full md:w-70">
            <div className={highlightMockupWrapper}>
              <img
                src={camera}
                alt="Mockup da Câmera do App Memora"
                className="w-full h-auto rounded-3xl shadow-[0_0_10px_3px_rgba(6,182,212,0.2)]"
              />
              <h1 className={textSubtitle}>Capture o momento</h1>
            </div>
          </div>
          <div className="w-full md:w-60">
            <div className={baseMockupWrapper}>
              <img
                src={perfil}
                alt="Mockup do Perfil do Convidado do App Memora"
                className="w-full h-auto rounded-3xl shadow-[0_0_10px_3px_rgba(6,182,212,0.2)]"
              />
              <h1 className={textSubtitle}>Seu perfil</h1>
            </div>
          </div>
        </div>

        <div className="mt- md:mt-10 max-w-fit mx-auto rounded-full p-[px] md:p-0.5 bg-purple-800 shadow-[0_0_10px_3px_rgba(6,182,212,0.2)]">
          <div className="bg-[#130E2E] rounded-full p-3 md:p-4 transition duration-300">
            <p className="text-white md:text-lg font-semibold px-4">
              ✨ A experiência social que seus convidados já dominam
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCase;
