import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  CreditCard,
  QrCode,
  Barcode,
  User,
  MapPin,
  FileText,
  Copy,
  Clock,
  X,
  CheckCircle2,
  Home,
  ShieldCheck,
  Calendar,
  Lock,
  Download,
  Building,
} from "lucide-react";

const PaymentPlan = ({ onPrev }) => {
  // Lógica de Navegação do Checkout
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState("select"); // 'select', 'pix', 'card', 'boleto'

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPaymentStep("select");
  };

  return (
    <div className="relative font-sans flex items-center justify-center selection:bg-cyan-500/30 ">
      {/* ====================================================================================
          1. TELA PRINCIPAL: DADOS DE ENDEREÇO
      ==================================================================================== */}
      <div
        className={`w-full max-w-lg mx-auto px-4 flex flex-col gap-5 transition-all duration-500  ${
          isModalOpen
            ? "opacity-20 blur-md scale-95 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-cyan-400">
              Quase Lá
            </span>
          </h2>
          <p className="text-zinc-500 text-sm tracking-wide">
            Confirme os dados para finalizar sua ativação.
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-3 px-1">
            <FileText size={18} className="text-cyan-500" />
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-left">
              Dados da Nota Fiscal & Endereço
            </h3>
          </div>

          <div className="space-y-1">
            {/* CPF / CNPJ */}
            <div className="relative group">
              <User
                className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="CPF ou CNPJ"
                className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            {/* Grid Endereço */}
            <div className="grid grid-cols-4 gap-x-6 gap-y-6">
              <div className="col-span-2 relative group">
                <MapPin
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="CEP"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div className="col-span-2 relative group">
                <Building
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-400 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Estado (UF)"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="col-span-3 relative group">
                <Home
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-400 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Rua / Avenida"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  placeholder="Nº"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-center text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="col-span-4">
                <input
                  type="text"
                  placeholder="Complemento (Opcional)"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-2 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação Inferiores */}
        <div className="pt-6 flex justify-between items-center">
          <button
            className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
            onClick={onPrev}
          >
            <div className="p-2.5 rounded-full border border-white/10 group-hover:border-violet-500 group-hover:bg-violet-500/10 transition-all">
              <ChevronLeft
                size={20}
                className="text-violet-500 transition-transform group-hover:-translate-x-1"
              />
            </div>
            <span className="text-lg font-medium tracking-wide">Voltar</span>
          </button>

          <button
            onClick={handleOpenModal}
            className="group flex items-center gap-4 px-8 py-4 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg shadow-[0_10px_30px_-10px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            Pagar Agora
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ====================================================================================
          2. MODAL DE CHECKOUT (FULL OVERLAY)
      ==================================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-300">
          {/* CARD: MENOS REDONDO (rounded-2xl) E SHADOW MEMORA */}
          <div className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-8 relative flex flex-col items-center shadow-[0_0_50px_-10px_rgba(139,92,246,0.25)] animate-in zoom-in-95 slide-in-from-bottom-8">
            {/* Botão Fechar */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* PASSO: SELEÇÃO DE MÉTODO */}
            {paymentStep === "select" && (
              <div className="w-full space-y-8 text-center animate-in fade-in slide-in-from-top-4">
                <div className="pt-4">
                  {/* TÍTULO COM LINEAR GRADIENT v4 */}
                  <h3 className="text-2xl font-bold mb-2 bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                    Como deseja pagar?
                  </h3>
                  <p className="text-cyan-500 font-mono text-sm font-bold">
                    Total: R$ 199,90
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => setPaymentStep("pix")}
                    className="flex items-center gap-5 p-4 rounded-xl border border-white/5 bg-zinc-950/40 hover:border-cyan-500 group transition-all duration-300"
                  >
                    <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-500 group-hover:scale-110 transition-transform">
                      <QrCode size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-base font-bold text-white leading-none mb-1">
                        Pix Instantâneo
                      </p>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">
                        Aprovação imediata
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentStep("card")}
                    className="flex items-center gap-5 p-4 rounded-xl border border-white/5 bg-zinc-950/40 hover:border-violet-500 group transition-all duration-300"
                  >
                    <div className="p-3 rounded-lg bg-violet-500/10 text-violet-500 group-hover:scale-110 transition-transform">
                      <CreditCard size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-base font-bold text-white leading-none mb-1">
                        Cartão de Crédito
                      </p>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">
                        Até 12x no cartão
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentStep("boleto")}
                    className="flex items-center gap-5 p-4 rounded-xl border border-white/5 bg-zinc-950/40 hover:border-zinc-400 group transition-all duration-300"
                  >
                    <div className="p-3 rounded-lg bg-zinc-500/10 text-zinc-400 group-hover:scale-110 transition-transform">
                      <Barcode size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-base font-bold text-white leading-none mb-1">
                        Boleto Bancário
                      </p>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">
                        Compensa em até 3 dias
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* PASSO: PIX (CHECKOUT) */}
            {paymentStep === "pix" && (
              <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95">
                <div className="mb-6 p-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_25px_-5px_rgba(6,182,212,0.4)]">
                  <QrCode size={40} />
                </div>
                <h3 className="text-xl font-bold mb-6 bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                  Pague via Pix
                </h3>

                <div className="w-60 h-60 bg-white p-3 rounded-xl mb-6 shadow-2xl border-4 border-white/10">
                  <QrCode size={216} className="text-black w-full h-full" />
                </div>

                <div className="w-full relative mb-8">
                  <input
                    type="text"
                    value="00020126580014..."
                    readOnly
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl py-4 pl-5 pr-14 text-xs text-zinc-500 font-mono focus:outline-none"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-cyan-500 bg-cyan-500/10 rounded-lg">
                    <Copy size={20} />
                  </button>
                </div>

                <button className="w-full py-4 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.5)]">
                  JÁ PAGUEI <CheckCircle2 size={20} />
                </button>
              </div>
            )}

            {/* PASSO: CARTÃO (CHECKOUT) */}
            {paymentStep === "card" && (
              <div className="w-full animate-in fade-in slide-in-from-right-8">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-[0_0_25px_-5px_rgba(139,92,246,0.4)]">
                    <CreditCard size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-8 text-center tracking-tight bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                  Dados do Cartão
                </h3>
                <div className="space-y-6 mb-10">
                  <div className="group">
                    <input
                      type="text"
                      placeholder="Número do Cartão"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-base text-white focus:outline-none focus:border-violet-500 transition-all font-mono tracking-widest"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Nome no Cartão"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-base text-white focus:outline-none focus:border-violet-500 uppercase"
                  />
                  <div className="grid grid-cols-2 gap-8">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="bg-transparent border-b border-white/10 py-3 text-base text-white focus:outline-none focus:border-violet-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="bg-transparent border-b border-white/10 py-3 text-base text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div className="relative">
                    <select className="w-full bg-transparent border-b border-white/10 py-3 text-base text-zinc-400 focus:outline-none focus:border-violet-500 cursor-pointer appearance-none">
                      <option className="bg-zinc-900">1x R$ 199,90</option>
                    </select>
                    <ChevronRight
                      className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 text-zinc-600 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>
                <button className="w-full py-4 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)]">
                  PAGAR AGORA <Lock size={18} />
                </button>
              </div>
            )}

            {/* PASSO: BOLETO (CHECKOUT) */}
            {paymentStep === "boleto" && (
              <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95">
                <div className="mb-6 p-4 rounded-full bg-zinc-500/10 text-zinc-300 border border-white/10 shadow-lg">
                  <Barcode size={40} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                  Boleto Disponível
                </h3>
                <p className="text-xs text-zinc-500 text-center mb-8 px-4 leading-relaxed tracking-tight">
                  Vencimento em 3 dias. Aprovação rápida via QR Code Pix no
                  boleto.
                </p>

                <div className="w-full space-y-4 mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      value="34191.79001 01043.51004..."
                      readOnly
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-[10px] text-zinc-400 font-mono shadow-inner"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-lg">
                      <Copy size={18} />
                    </button>
                  </div>
                  <button className="w-full py-4 rounded-xl border border-white/10 text-zinc-300 font-bold text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-3 uppercase tracking-widest">
                    BAIXAR PDF <Download size={20} />
                  </button>
                </div>

                <button className="w-full py-4 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg active:scale-95 transition-all">
                  JÁ PAGUEI
                </button>
              </div>
            )}

            {/* Voltar para escolha de método */}
            {paymentStep !== "select" && (
              <button
                onClick={() => setPaymentStep("select")}
                className="mt-8 text-[11px] font-bold text-zinc-600 hover:text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2 transition-all"
              >
                <ChevronLeft size={14} /> Mudar Pagamento
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPlan;
