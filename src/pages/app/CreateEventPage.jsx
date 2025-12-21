import { Link } from "react-router-dom"; // Removi o import não usado
import { ArrowLeft } from "lucide-react";
import CreateEvent from "../../components/layout/CreateEvent";
import CreatePlans from "../../components/layout/CreatePlans";
import ReviewPlan from "../../components/layout/ReviewPlan";
import Payment from "../../components/layout/PaymentPlan";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const CreateEventPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [globalData, setGlobalData] = useState({});

  const nextStep = () =>
    setActivePage((prev) => prev + (activePage === 4 ? 0 : 1));
  const prevStep = () => setActivePage((prev) => prev - 1);

  const handleSaveStep = (dataForm) => {
    setGlobalData((prev) => ({ ...prev, ...dataForm }));
    nextStep();
  };

  const handleFinishOrder = async (finalPayload) => {
    try {
      console.log("🔥 Iniciando salvamento...");

      // 1. Pega usuário logado
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Erro: Usuário não logado.");
        return;
      }

      /* 2. Atualizar a tabela public.users */
      const userUpdatedata = {
        cpf: finalPayload.infoUser.cpf,
        cep: finalPayload.infoUser.cep,
        state: finalPayload.infoUser.state,
        city: finalPayload.infoUser.city,
        neighborhood: finalPayload.infoUser.neighborhood,
        street: finalPayload.infoUser.street,
        number: finalPayload.infoUser.number,
        complement: finalPayload.infoUser.complement,
      };

      // CORREÇÃO 1: Removi o ponto extra antes de (userUpdatedata)
      const { error: userError } = await supabase
        .from("users")
        .update(userUpdatedata)
        .eq("id", user.id);

      if (userError) throw userError;

      /* 3. Inserir na tabela public.events */
      const event_info = {
        owner_id: user.id, // CORREÇÃO 2: ownerId -> owner_id (igual ao banco)
        slug: finalPayload.slug,
        category: finalPayload.category,
        event_name: finalPayload.event_name,
        event_date: finalPayload.event_date,
        time_event: finalPayload.time_event,
        location: finalPayload.location,
        plan_tier: finalPayload.plan_tier,
        payment_method: finalPayload.payment_method,
        status: "PENDENTE",
        retention_days: 90,
        is_active: true,
      };

      const { data, error: eventError } = await supabase
        .from("events")
        .insert([event_info])
        .select()
        .single();

      if (eventError) throw eventError;

      console.log("✅ Evento Salvo! ID:", data.id);
      alert("Evento criado com sucesso!");

      // Aqui você pode redirecionar para o Dashboard
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("❌ Erro ao salvar:", error);
      alert("Erro ao salvar: " + error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col relative">
      <Link
        to="/"
        className="absolute top-6 left-6 p-2 flex items-center gap-2 text-zinc-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all duration-300 group"
        title="Voltar para o início"
      >
        <ArrowLeft
          size={28}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Página Inicial
      </Link>

      {activePage === 1 && (
        <div className="flex-1 flex items-center justify-center p-4">
          <CreateEvent onNext={handleSaveStep} />
        </div>
      )}
      {activePage === 2 && (
        <div className="flex-1 flex items-center justify-center p-4">
          <CreatePlans onNext={handleSaveStep} onPrev={prevStep} />
        </div>
      )}
      {activePage === 3 && (
        <div className="flex-1 flex items-center justify-center p-4">
          <ReviewPlan
            onNext={handleSaveStep}
            onPrev={prevStep}
            formData={globalData}
          />
        </div>
      )}
      {activePage === 4 && (
        <div className="flex-1 flex items-center justify-center p-4">
          <Payment
            // AQUI ESTÁ PERFEITO: Chama a função que salva no banco
            onNext={handleFinishOrder}
            onPrev={prevStep}
            formData={globalData}
          />
        </div>
      )}
    </div>
  );
};

export default CreateEventPage;
