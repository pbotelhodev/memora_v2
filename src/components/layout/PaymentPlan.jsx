// Import Tools
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  X,
  CheckCircle2,
  Home,
  Lock,
  Download,
  Building,
  Hash,
  PlusCircle,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
// Import database/supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Import navigate
import { useNavigate } from "react-router-dom";

// Imports Marcaras de inputs
import {
  maskCardNumber,
  maskCpfCnpj,
  maskCEP,
  maskCardExpiry,
  unmask,
} from "../../utils/masks";

//Import Layout/UI
import LoadingOverlay from "../ui/LoadingOverlay";

//Função
const PaymentPlan = ({ onPrev, formData, existingUser }) => {
  const navigate = useNavigate();
  // useStates
  const [isModalOpen, setIsModalOpen] = useState(false); // Abre e fecha o modal
  const [paymentStep, setPaymentStep] = useState("select"); // 'select', 'pix', 'card', 'boleto'
  const [infoUser, setInfoUser] = useState(); // Salva todas as informacoes do usuario, cpf e endereço
  const [loading, setLoading] = useState(false); // Tela de loading
  const [codePay, setCodePay] = useState(null); // Codigo pix ou código de barras

  // Array de planos
  const retentionPlan = {
    Pocket: 7,
    Social: 7,
    Celebration: 30,
    Black: 90,
    Infinity: 180,
  };
  const pricePlan = {
    Pocket: 29.9,
    Social: 59.9,
    Celebration: 99.9,
    Black: 149.9,
    Infinity: 199.9,
  };
 /*  const installmentsByPlan = {
    Pocket: 1, // 29.90
    Social: 2, // 59.90
    Celebration: 4, // 99.90
    Black: 6, // 149.90
    Infinity: 10, // 199.90
  }; */

  // Import useForm
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    getValues,
    /* formState: { errors }, */
  } = useForm();

  // UseEffects
  useEffect(() => {
    if (existingUser?.cpf) {
      // 1. Preenche o formulário visualmente (React Hook Form)
      // Caso o usuário feche o modal para editar, os dados já estarão lá
      setValue("cpf", existingUser.cpf);
      setValue("cep", existingUser.cep);
      setValue("state", existingUser.state);
      setValue("city", existingUser.city);
      setValue("neighborhood", existingUser.neighborhood);
      setValue("street", existingUser.street);
      setValue("number", existingUser.number);
      setValue("complement", existingUser.complement);

      // 2. Preenche o estado interno usado para envio
      setInfoUser(existingUser);

      // 3. Pula direto pro Modal! 🚀
      setIsModalOpen(true);
    }
  }, [existingUser, setValue]);

  //Função que fecha o modal de pagamento
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPaymentStep("select");
  };
  //Função que salva os dados do form fiscal
  const handleDataFisco = (data) => {
    setInfoUser(data);
    setIsModalOpen(true);
  };

  //Função que gera o pagamento ========================================
  const handleGeneratePayment = async (method) => {
    setLoading(true);

    try {
      console.log(`🔥 Gerando pagamento via ${method}...`);
      // Gera o pagamento
      const planKey = formData.plan_tier;
      const price = pricePlan[planKey];
      const payloadToSend = {
        infoUser: {
          cpf: (getValues("cpf") || infoUser?.cpf || "").replace(/\D/g, ""),
          // Usamos o || para garantir que nunca seja undefined
          name: formData.name_user || "Cliente não identificado",
          email: formData.email_user || "email@naoinformado.com",
          phone: formData.phone_user || "00000000000",

          street: getValues("street") || infoUser?.street || "",
          number: getValues("number") || infoUser?.number || "",
          neighborhood:
            getValues("neighborhood") || infoUser?.neighborhood || "",
          cep: (getValues("cep") || infoUser?.cep || "").replace(/\D/g, ""),
        },
        payment_method: method,
        event_name: formData.event_name || "Evento Sem Nome",
        plan_tier: formData.plan_tier,
        value: price,
      };
      console.log("📦 Enviando Payload:", payloadToSend);

      if (method !== "card") {
        // Chama a Edge Function
        const { data: result, error } = await supabase.functions.invoke(
          "create-payment",
          {
            body: payloadToSend,
          }
        );

        if (error) throw new Error(`Erro API: ${error.message}`);
        if (!result.success)
          throw new Error(result.error || "Pagamento não autorizado");

        console.log("✅ Pagamento criado:", result);
        setCodePay(result);
      }
      setPaymentStep(method);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = () => {
    const pixCode = codePay?.pix?.payload;
    navigator.clipboard.writeText(pixCode);
    alert("Código pix copiado!");
  };

  // Funçao que seta a festa no banco de dados ====================================================
  const handleFinalize = async (data) => {
    setLoading(true);
    console.log("🔥 Iniciando processo de pagamento...");

    try {
      // 1. Pega usuário logado
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Sessão expirada. Faça login novamente.");

      // ==============// ==============// ==============// ============== //
      // ============= // Preparação dos Dados (LIMPEZA) // ============== //
      // ==============// ==============// ==============// ============== //

      // 1. Limpeza do número do cartão
      const cleanCardNumber = data.card_number
        ? data.card_number.replace(/\s/g, "")
        : "";

      // 2. Tratamento da Data de Validade
      let expMonth = "";
      let expYear = "";

      if (data.card_expiry && data.card_expiry.includes("/")) {
        const splitDate = data.card_expiry.split("/");
        expMonth = splitDate[0];
        // Se o ano for "30", vira "2030". Se já for "2030", mantém.
        expYear =
          splitDate[1].length === 2 ? `20${splitDate[1]}` : splitDate[1];
      }

      const cardDataForApi = {
        card_number: cleanCardNumber,
        card_name: data.card_name,
        expiry_month: expMonth,
        expiry_year: expYear,
        card_cvv: data.card_cvv,
        ccv: data.card_cvv,
        card_installment: parseInt(data.card_installment, 10),
      };

      // 3. Garante o preço correto
      const price = pricePlan[formData.plan_tier];

      // ==============// ==============// ==============// ============== //
      // ============= //Chama o EdgeFunction do Supabase// ============== //
      // ==============// ==============// ==============// ============== //

      // AQUI ESTAVA O ERRO: Recriamos a estrutura { infoUser: {...} } que a API espera
      const payloadToSend = {
        infoUser: {
          cpf: (infoUser?.cpf || "").replace(/\D/g, ""),
          name:
            formData.name_user || infoUser?.name || "Cliente não identificado",
          email: formData.email_user || user.email, // Fallback pro email do auth
          phone: formData.phone_user || infoUser?.phone || "00000000000",

          street: infoUser?.street || "",
          number: infoUser?.number || "",
          neighborhood: infoUser?.neighborhood || "",
          city: infoUser?.city || "",
          state: infoUser?.state || "",
          complement: infoUser?.complement || "",
          cep: (infoUser?.cep || "").replace(/\D/g, ""),
        },
        payment_method: "card",
        event_name: formData.event_name || "Evento Sem Nome",
        plan_tier: formData.plan_tier,
        value: price,
        // Espalhamos os dados do cartão na raiz do objeto (junto com infoUser)
        ...cardDataForApi,
      };

      console.log("📦 Payload Final enviado para API:", payloadToSend);

      const { data: paymentResult, error: functionError } =
        await supabase.functions.invoke("create-payment", {
          body: payloadToSend,
        });

      // Tratamento de erro técnico da função
      if (functionError) {
        const errorBody = await functionError.context
          ?.json?.()
          .catch(() => null);
        console.error("Detalhes do erro da função:", functionError, errorBody);
        throw new Error(
          `Erro de comunicação com servidor: ${functionError.message}`
        );
      }

      // Tratamento de erro de negócio (Recusado pelo banco, etc)
      if (!paymentResult || !paymentResult.success) {
        throw new Error(
          paymentResult?.error || "Pagamento não autorizado pela operadora."
        );
      }

      console.log("💸 Pagamento Aprovado!", paymentResult);

      // ==============// ==============// ==============// ============== //
      // =========  Atualiza o perfil do usuario, se necessário  ========= //
      // ==============// ==============// ==============// ============== //

      const { data: existingProfile } = await supabase
        .from("users")
        .select("cpf")
        .eq("id", user.id)
        .single();

      if (!existingProfile?.cpf) {
        console.log("💾 Salvando dados fiscais no perfil do usuário...");
        await supabase
          .from("users")
          .update({
            cpf: infoUser.cpf,
            cep: infoUser.cep,
            street: infoUser.street,
            number: infoUser.number,
            neighborhood: infoUser.neighborhood,
            city: infoUser.city,
            state: infoUser.state,
            complement: infoUser.complement,
          })
          .eq("id", user.id);
      }

      // ==============// ==============// ==============// ============== //
      // ============ // Salva o evento no banco de dados // ============= //
      // ==============// ==============// ==============// ============== //

      const { error: dbError } = await supabase.from("events").insert([
        {
          payment_id: paymentResult.paymentId,
          owner_id: user.id,
          slug: formData.slug,
          event_name: formData.event_name,
          plan_tier: formData.plan_tier,
          is_active: true,
          retention_days: retentionPlan[formData.plan_tier],
          event_date: formData.event_date,
          location: formData.location,
          category: formData.category,
          payment_method: paymentStep,
          status: paymentResult.status,
          time_event: formData.time_event,
        },
      ]);

      if (dbError) throw dbError;

      console.log("✅ Evento Salvo com Sucesso! ID:", paymentResult.id);

      // ============== // ============== // ==============// ============== //
      // ============== //  Redireciona para o dashboard   // ============== //
      // ============== // ============== // ==============// ============== /

      setLoading(false);
      navigate("/app/dashboard");
    } catch (error) {
      console.error("❌ Erro fatal no processo:", error);
      alert(`Erro: ${error.message}`);
      setLoading(false);
    }
  };

  //Função que coleta o CepApi e preenche os campos automaticamente
  const handleBlurCEP = async (e) => {
    //Limpa o CEP
    setLoading(true);

    const cleanCep = unmask(e.target.value);

    //Confirma se tem os 8 números padrões
    if (cleanCep?.length === 8) {
      try {
        //chama a API de CEP
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cleanCep}/json/`
        );
        if (!data.erro) {
          setValue("street", data.logradouro);
          setValue("neighborhood", data.bairro);
          setValue("city", data.localidade);
          setValue("state", data.uf);

          //verifica se é CEP geral e se tem bairro e rua
          if (!data.logradouro) {
            if (!data.bairro) {
              setFocus("neighborhood");
            } else {
              setFocus("street");
            }
          } else {
            //Joga pro input numero
            setFocus("number");
          }
        } else {
          alert("Cep não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleDataFisco)}
      className="relative font-sans flex items-center justify-center selection:bg-cyan-500/30 "
    >
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
            Garanta a exclusividade do seu evento e libere seu acesso imediato
            ao painel.
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
                {...register("cpf", {
                  required: "Insira o seu CPF/CNPJ.",
                  onChange: (event) =>
                    (event.target.value = maskCpfCnpj(event.target.value)),
                })}
                type="tel"
                placeholder="CPF ou CNPJ"
                className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            {/* Grid Endereço */}
            <div className="grid grid-cols-4 gap-x-6 gap-y-6">
              {/* LINHA 1: CEP e UF */}
              <div className="col-span-2 relative group">
                <MapPin
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-500 transition-colors"
                  size={20}
                />
                <input
                  {...register("cep", {
                    required: "Insira o seu CEP.",
                    onChange: (event) =>
                      (event.target.value = maskCEP(event.target.value)),
                  })}
                  onBlur={handleBlurCEP}
                  type="tel"
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
                  {...register("state", {
                    required: "Insira o seu estado(UF)",
                  })}
                  type="text"
                  placeholder="Estado (UF)"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              {/* LINHA 2 (NOVA): Cidade e Bairro */}
              <div className="col-span-2 relative group">
                <Building
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-500 transition-colors"
                  size={20}
                />
                <input
                  {...register("city", { required: "Insira sua cidade" })}
                  type="text"
                  placeholder="Cidade"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="col-span-2 relative group">
                <MapPin
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-400 transition-colors"
                  size={20}
                />
                <input
                  {...register("neighborhood", {
                    required: "Insira seu bairro",
                  })}
                  type="text"
                  placeholder="Bairro"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              {/* LINHA 3: Rua (Full Width para caber nomes longos) */}
              <div className="col-span-4 relative group">
                <Home
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-400 transition-colors"
                  size={20}
                />
                <input
                  {...register("street", { required: "Insira sua rua" })}
                  type="text"
                  placeholder="Rua / Avenida"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              {/* LINHA 4: Número e Complemento */}
              <div className="col-span-1 relative group">
                <Hash
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-500 transition-colors"
                  size={20}
                />
                <input
                  {...register("number", {
                    required: "Insira o número da sua residência",
                  })}
                  type="tel"
                  placeholder="Nº"
                  // Removi 'text-center' e adicionei 'pl-9' para caber o ícone
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="col-span-3 relative group">
                <PlusCircle
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-500 transition-colors"
                  size={20}
                />
                <input
                  {...register("complement")}
                  type="text"
                  placeholder="Complemento (Opcional)"
                  // Mudei de 'pl-2' para 'pl-9' para caber o ícone
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-9 text-base text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação Inferiores */}
        <div className="pt-6 flex justify-between items-center">
          <button
            type="button"
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
            type="submit"
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
              type="button"
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
                    type="button"
                    onClick={() => handleGeneratePayment("pix")}
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
                    type="button"
                    /* onClick={() => handleGeneratePayment("card")} */
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
                        Até 10x no cartão
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGeneratePayment("boleto")}
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
                {infoUser && (
                  <div className="mt-2 p-3 bg-zinc-950/50 rounded-lg border border-white/5 text-left flex justify-between items-center group">
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">
                        Faturamento para:
                      </p>
                      <p className="text-xs text-zinc-300 truncate max-w-50">
                        {infoUser.street}, {infoUser.number},{" "}
                        {infoUser.neighborhood}
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        CPF: {infoUser.cpf}
                      </p>
                    </div>

                    {/* Botão para ele poder voltar e editar se quiser */}
                    <button
                      onClick={() => setIsModalOpen(false)} // Fecha o modal e mostra o form preenchido
                      className="text-cyan-500 hover:text-cyan-400 text-xs font-bold"
                    >
                      Alterar
                    </button>
                  </div>
                )}
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

                {/* GERADOR DE QR CODE VIA API EXTERNA */}
                <div className="w-60 h-60 bg-white p-3 mb-5 rounded-xl flex items-center justify-center">
                  {codePay?.pix?.encodedImage ? (
                    <img
                      // O Asaas manda o Base64 puro. O navegador precisa do prefixo data:image/png;base64,
                      src={`data:image/png;base64,${codePay.pix.encodedImage}`}
                      alt="QR Code Pix"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="animate-spin text-zinc-400" />
                      <span className="text-zinc-400 text-xs">
                        Gerando QR Code...
                      </span>
                    </div>
                  )}
                </div>

                <div className="w-full relative mb-8">
                  <input
                    type="text"
                    value={
                      codePay?.pix?.payload || "Gerando codigo copia & cola"
                    }
                    readOnly
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl py-4 pl-5 pr-14 text-xs text-zinc-500 font-mono focus:outline-none"
                  />
                  <button
                    onClick={handleCopyPix}
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-cyan-500 bg-cyan-500/10 rounded-lg"
                  >
                    <Copy size={20} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit(handleFinalize)}
                  className="w-full py-4 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.5)]"
                >
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
                      {...register("card_number", {
                        required: "Insira um cartão válido",
                        onChange: (event) =>
                          (event.target.value = maskCardNumber(
                            event.target.value
                          )),
                      })}
                      type="tel"
                      placeholder="Número do Cartão"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-base text-white focus:outline-none focus:border-violet-500 transition-all font-mono tracking-widest"
                    />
                  </div>
                  <input
                    {...register("card_name", {
                      required: "Coloque o nome como está no cartão",
                    })}
                    type="text"
                    placeholder="Nome no Cartão"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-base text-white focus:outline-none focus:border-violet-500 uppercase"
                  />
                  <div className="grid grid-cols-2 gap-8">
                    <input
                      {...register("card_expiry", {
                        required:
                          "Coloque a data correta de vencimento do cartão",
                        onChange: (event) =>
                          (event.target.value = maskCardExpiry(
                            event.target.value
                          )),
                      })}
                      type="tel"
                      placeholder="MM/AA"
                      className="bg-transparent border-b border-white/10 py-3 text-base text-white focus:outline-none focus:border-violet-500"
                    />
                    <input
                      {...register("card_cvv", {
                        required: "Coloque o cvv como está no cartão",
                      })}
                      type="tel"
                      placeholder="CVV"
                      className="bg-transparent border-b border-white/10 py-3 text-base text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div className="relative">
                    <select
                      {...register("card_installment", {
                        required: "Coloque o nome como está no cartão",
                      })}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-base text-zinc-400 focus:outline-none focus:border-violet-500 cursor-pointer appearance-none"
                    >
                      <option value={1} selected className="bg-zinc-900">
                        1x R$ 199,90
                      </option>
                    </select>
                    <ChevronRight
                      className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 text-zinc-600 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  // LÓGICA CORRIGIDA: Chama handleFinalize para processar e salvar
                  onClick={handleSubmit(handleFinalize)}
                  className="w-full py-4 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)]"
                >
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
                  O boleto foi gerado com sucesso. Clique no botão abaixo para
                  visualizar o documento e realizar o pagamento.
                </p>

                <div className="w-full space-y-4 mb-8">
                  {/* BOTÃO DESTAQUE: GRADIENTE + GLOW (Ação Principal) */}
                  <button
                    onClick={() => window.open(codePay?.boletoUrl, "_blank")}
                    className="w-full py-4 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)]"
                  >
                    VISUALIZAR BOLETO <Download size={20} />
                  </button>

                  {/* BOTÃO CLEAN: APENAS BORDA (Ação Secundária) */}
                  <button
                    onClick={handleSubmit(handleFinalize)}
                    className="w-full py-4 rounded-xl border border-white/5 bg-white/5 text-zinc-400 font-bold text-lg hover:bg-white/10 hover:text-white transition-all active:scale-95"
                  >
                    JÁ PAGUEI
                  </button>
                </div>

                {/* TEXTO DE SUPORTE CASO PRECISE */}
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                  Vencimento em 3 dias úteis
                </p>
              </div>
            )}

            {/* Voltar para escolha de método */}
            {paymentStep !== "select" && (
              <button
                type="button"
                onClick={() => setPaymentStep("select")}
                className="mt-8 text-[11px] font-bold text-zinc-600 hover:text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2 transition-all"
              >
                <ChevronLeft size={14} /> Mudar Pagamento
              </button>
            )}
          </div>
        </div>
      )}
      {loading && <LoadingOverlay />}
    </form>
  );
};

export default PaymentPlan;
