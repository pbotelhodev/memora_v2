// src/components/ShowCase.jsx

import React from "react";
import feed from "../../assets/mockup-feed.png";
import camera from "../../assets/mockup-camera.png";
import perfil from "../../assets/mockup-perfil.png";

const ShowCase = () => {
  const baseMockupWrapper =
    "shadow-2xl transition duration-500 hover:scale-[1.08]";
  const highlightMockupWrapper =
    "shadow-2xl md:scale-[0.9] md:z-10 relative transition duration-500 md:hover:scale-[0.95]";

  return (
    <section className="bg-slate-950 py-20 ">
      <div className="max-w-7xl mx-auto px-4 text-center ">
        <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-4 ">
          Experiência Mobile
        </h2>
        <h3 className=" text-gray-400 text-xl md:text-xl max-w-2xl mx-auto mb-1 md:mb-10">
          Seus convidados acessam pelo celular e compartilham momentos em tempo
          real.
        </h3>
        <div className="scale-[0.9] md:scale-[1] md:flex md:justify-center md:space-x-12 space-y-12 md:space-y-0 items-center">
          <div className="w-full md:w-60">
            <div className={baseMockupWrapper}>
              <img
                src={feed}
                alt="Mockup da Timeline do App Memora"
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </div>
          <div className="w-full md:w-70">
            <div className={highlightMockupWrapper}>
              <img
                src={camera}
                alt="Mockup da Câmera do App Memora"
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </div>
          <div className="w-full md:w-60">
            <div className={baseMockupWrapper}>
              <img
                src={perfil}
                alt="Mockup do Perfil do Convidado do App Memora"
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 md:mt-10 max-w-fit mx-auto shadow-xl rounded-full p-[1px] md:p-[2px] bg-gradient-to-r from-purple-500 to-cyan-500">
          <div className="bg-slate-900 rounded-full p-3 md:p-4 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
            <p className="text-white text-xl md:text-xl font-semibold px-4">
              ✨ A experiência
              social que seus convidados já dominam
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCase;
