import { Link } from "react-router-dom"; // Para navegação
import { ArrowLeft } from "lucide-react"; // O ícone da setinha
import CreateEvent from "../../components/layout/CreateEvent";
import CreatePlans from "../../components/layout/CreatePlans";
import ReviewPlan from "../../components/layout/ReviewPlan";
import Payment from "../../components/layout/PaymentPlan";
import { useState } from "react";

const CreateEventPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [globalData, setGlobalData] = useState({});

  const nextStep = () => setActivePage((prev) => prev + 1);
  const prevStep = () => setActivePage((prev) => prev - 1);

  const handleSaveStep = (dataForm) => {
    setGlobalData((prev) => ({ ...prev, ...dataForm }));
    nextStep();
    console.log(globalData);
  };


  return (
    // Adicionei 'relative' aqui para poder posicionar a setinha de forma absoluta
    <div className="min-h-screen w-full bg-slate-950 flex flex-col relative">
      <Link
        to="/" // Ou "/app/dashboard" se preferir voltar pro painel
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
          <Payment onNext={handleSaveStep} onPrev={prevStep} />
        </div>
      )}
    </div>
  );
};

export default CreateEventPage;
