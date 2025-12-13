//Import tools
import { useState } from "react";
import { Link } from "react-router-dom";

//import icons
import { Menu } from "lucide-react";

//import assets
import logoMemora from "../../assets/logoMemora.png";

const Header = () => {
  const [menuSwitch, setMenuSwitch] = useState(false);

  const navLinks = [
    { name: "Como funciona", href: "#como-funciona" },
    { name: "Planos", href: "#planos" },
    { name: "Painel", href: "/login" },
  ];

  return (
    <header className="fixed left-0 right-0 bg-slate-900/90 border-b border-white/10">
      <nav className=" backdrop-blur-sm flex justify-between items-center h-20 max-w-6xl mx-auto p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-white cursor-pointer ">
          <Link to="/" className="">
            <img src={logoMemora} className="w-28 h-auto" alt="Logo memora" />
          </Link>
        </div>
        {/* Navegação */}
        <div className="hidden md:flex space-x-15">
          {navLinks.map((navLink) => (
            <Link
              to={navLink.href}
              key={navLink.name}
              className="text-gray-300 hover:text-cyan-500 transition duration-300"
            >
              {navLink.name}
            </Link>
          ))}
        </div>
        {/* Botão */}
        <div className="flex items-center">
          {/* CTA (Desktop) */}
          <Link
            to="/app/criar"
            className="hidden md:block px-5 py-2 font-semibold text-white 
                   bg-gradient-to-r from-violet-600 to-cyan-500 
                   rounded-lg transition duration-300 hover:opacity-80"
          >
            Criar Evento
          </Link>
          {/* Menu Button (Mobile) */}
          <button
            onClick={() => setMenuSwitch(!menuSwitch)}
            className="md:hidden text-white text-2xl"
          >
            <Menu className="text-cyan-500 w-7 h-7" />
          </button>
        </div>
        {/* Navegação Responsivo */}
      </nav>
      {menuSwitch && (
        <nav className="fixed top-20 right-0 w-64 bg-slate-900 z-40 shadow-2xl md:hidden">
          <div className="flex flex-col space-y-4 p-4 ">
            {navLinks.map((navLink) => (
              <Link
                to={navLink.href}
                key={navLink.name}
                className="text-white text-lg hover:text-cyan-500 transition duration-300"
                onClick={() => setMenuSwitch(false)}
              >
                {navLink.name}
              </Link>
            ))}
            <Link
              to="/app/criar"
              className="mt-4 px-4 py-2 text-center font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 rounded-lg shadow-lg"
              onClick={() => setMenuSwitch(false)} // FECHA O MENU NO CLIQUE
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
