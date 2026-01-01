import { Link } from "react-router-dom"; // Removi o import não usado
import { ArrowLeft } from "lucide-react";
import CreateEvent from "../../components/layout/CreateEvent";
import CreatePlans from "../../components/layout/CreatePlans";
import ReviewPlan from "../../components/layout/ReviewPlan";
import Payment from "../../components/layout/PaymentPlan";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);



const CreateEventPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [globalData, setGlobalData] = useState({});
  const [userProfile, setUserProfile] = useState(null);

  // Dentro do seu CreateEventPage.jsx
  useEffect(() => {
    const loadUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error } = await supabase
          .from("users")
          .select(
            "name, whatsapp, cpf, cep, state, city, neighborhood, street, number, complement"
          ) // Buscamos tudo de uma vez
          .eq("id", user.id)
          .single();

        if (!error && profile) {
          // 1. Atualiza o globalData para o envio da API
          setGlobalData((prev) => ({
            ...prev,
            name_user: profile.name,
            email_user: user.email,
            phone_user: profile.whatsapp,
          }));

          // 2. IMPORTANTE: Alimenta o userProfile para o formulário do filho auto-preencher
          setUserProfile(profile);
        }
      }
    };

    loadUserProfile();
  }, []);

  const nextStep = () =>
    setActivePage((prev) => prev + (activePage === 4 ? 0 : 1));
  const prevStep = () => setActivePage((prev) => prev - 1);

  const handleSaveStep = (dataForm) => {
    setGlobalData((prev) => ({ ...prev, ...dataForm }));
    nextStep();
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

            onPrev={prevStep}
            formData={globalData}
            existingUser={userProfile}
          />
        </div>
      )}
    </div>
  );
};

export default CreateEventPage;
