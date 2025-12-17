import React from "react";
// Importando ícones (instale: npm install lucide-react)
import { Instagram, ExternalLink, Heart } from "lucide-react";
import smarttexLogoWhite from "../../assets/LogoSmarttexWhite.png";

const Footer = () => {
  // Dados simulados para manter o JSX limpo (Token por Token: organização é tudo!)
  const productLinks = [
    { label: "Como Funciona", href: "#funcionalidades" },
    { label: "Para Casamentos", href: "#planos" },
    { label: "Eventos Corporativos", href: "#planos" },
    { label: "Ver Planos", href: "#planos" },
    { label: "Área do Cliente", href: "/login", highlight: true }, // Destaque sutil
  ];

  const supportLinks = [
    { label: "Central de Ajuda (FAQ)", href: "/faq" },
    {
      label: "Fale Conosco",
      href: "https://api.whatsapp.com/send?phone=5538997334556&text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20o%20meu%20evento%20Memora!",
    },
    { label: "Seja um Parceiro", href: "/parceiros" },
  ];

  const legalLinks = [
    { label: "Termos de Uso", href: "/termos" },
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Política de Cookies", href: "/cookies" },
    { label: "Admin", href: "/admin", hidden: true }, // O tal link discreto
  ];

  return (
    // 1. O Container Principal (fundo preto, texto cinza claro para não cansar a vista)
    <footer className="bg-black text-gray-400 border-t border-gray-800 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-cyan-500">
              memora
            </span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">
            Desenvolvido para conectar momentos reais.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/appmemora_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* COLUNA 2: Produto */}
        <div>
          <h3 className="text-white font-semibold mb-4">Produto</h3>
          <ul className="space-y-2 text-sm">
            {productLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`hover:text-blue-400 transition-colors ${
                    link.highlight ? "text-white font-medium" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUNA 3: Suporte */}
        <div>
          <h3 className="text-white font-semibold mb-4">Suporte</h3>
          <ul className="space-y-2 text-sm">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUNA 4: Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  // Lógica para o link "Admin": opacidade baixa (discreto)
                  className={`hover:text-blue-400 transition-colors ${
                    link.hidden
                      ? "text-gray-700 hover:text-gray-500 text-xs"
                      : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Barra Inferior (Copyright + Smarttex) */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2025 Memora. All rights reserved.</p>

          <div className="flex items-center gap-2 text-gray-500">
            <span>Desenvolvido por:</span>
            <a
              href="https://smarttex.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <img
                src={smarttexLogoWhite}
                alt="Logo Smarttex"
                className="h-5 w-auto"
              />
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
