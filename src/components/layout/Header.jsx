//Import tools
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";

//import icons
import { Menu } from "lucide-react";

//import assets
import logoMemora from "../../assets/logoMemora.png";

const Header = () => {
  const navigate = useNavigate();

  const [menuSwitch, setMenuSwitch] = useState(false);

  const handleScroll = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Fecha o menu mobile se estiver aberto
    setMenuSwitch(false);
  };

  const handleCreateEvent = async (e) => {
    const textButton = e.currentTarget.innerText;
    let textExit;
    textButton === "Criar Evento" || textButton === "Criar minha festa agora"
      ? (textExit = "/app/criar")
      : (textExit = "/app/dashboard");

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      console.log("Usuário autorizado:", session.user.id);
      navigate(textExit);
    } else {
      navigate("/login", { state: { destino: textExit } });
    }
    setMenuSwitch(false);
  };

  const navLinks = [
    { name: "Como funciona", href: "#funcionalidades" },
    { name: "Planos", href: "#planos" },
    { name: "Painel", href: "/app/dashboard" },
  ];

  return (
    <header className="fixed left-0 right-0 bg-slate-900/90 border-b border-white/10 z-50">
      <nav className=" backdrop-blur flex justify-between items-center h-16 max-w-6xl mx-auto p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-white cursor-pointer ">
          <Link to="/">
            <img src={logoMemora} className="w-28 h-auto" alt="Logo memora" />
          </Link>
        </div>

        {/* ================================================= */}
        {/* ============ NAVEGAÇÃO DESKTOP ================== */}
        {/* ================================================= */}
        <div className="hidden md:flex space-x-15">
          {navLinks.map((navLink) => {
            const isAnchor = navLink.href.startsWith("#");

            if (isAnchor) {
              return (
                <a
                  key={navLink.name}
                  href={navLink.href}
                  onClick={(e) => handleScroll(e, navLink.href)}
                  className="text-gray-300 hover:text-cyan-500 transition duration-300 cursor-pointer font-medium"
                >
                  {navLink.name}
                </a>
              );
            }
            return (
              <Link
                key={navLink.name}
                to={navLink.href}
                className="text-gray-300 hover:text-cyan-500 transition duration-300 cursor-pointer font-medium"
              >
                {navLink.name}
              </Link>
            );
          })}
        </div>

        {/* Botão e Menu Hamburguer */}
        <div className="flex items-center">
          {/* CTA (Desktop) */}
          <button
            onClick={handleCreateEvent}
            className="text-[15px] hidden md:block px-5 py-2 font-semibold text-white 
                   bg-gradient-to-r from-violet-600 to-cyan-500 shadow-[0_0_10px_0_rgba(59,130,246,0.2)] 
                   rounded-lg  transition duration-300 hover:opacity-80 hover:scale-[1.02] active:scale-100"
          >
            Criar Evento
          </button>
          {/* Menu Button (Mobile) */}
          <button
            onClick={() => setMenuSwitch(!menuSwitch)}
            className="md:hidden text-white text-2xl"
          >
            <Menu className="text-cyan-500 w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* ================================================= */}
      {/* ============ NAVEGAÇÃO MOBILE =================== */}
      {/* ================================================= */}
      {menuSwitch && (
        <nav className="fixed top-16 right-0 w-64 bg-slate-900 h-full z-40 shadow-2xl md:hidden border-l border-t border-white/10">
          <div className="flex flex-col space-y-4 p-4 ">
            {navLinks.map((navLink) => {
              const isAnchor = navLink.href.startsWith("#");

              if (isAnchor) {
                return (
                  <a
                    key={navLink.name}
                    href={navLink.href}
                    onClick={(e) => handleScroll(e, navLink.href)}
                    className="text-gray-300 hover:text-cyan-500 transition duration-300 cursor-pointer"
                  >
                    {navLink.name}
                  </a>
                );
              }
              return (
                <Link
                  key={navLink.name}
                  to={navLink.href}
                  onClick={() => setMenuSwitch(false)}
                  className="text-gray-300 hover:text-cyan-500 transition duration-300 cursor-pointer"
                >
                  {navLink.name}
                </Link>
              );
            })}

            <Link
              to="/app/criar"
              className="mt-4 px-4 py-2 text-center font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 rounded-lg shadow-[0_0_10px_0_rgba(59,130,246,0.2)] hover:scale-[1.02] active:scale-100"
              onClick={() => setMenuSwitch(false)}
            >
              CRIAR EVENTO
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
