//Importação das bibliotecas de roteamento
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importação das páginas
import Home from "./pages/public/Home";
import EventFeed from "./pages/public/EventFeed";
import AuthPage from "./pages/auth/AuthPage";
import Dashboard from "./pages/app/Dashboard";
import CreateEvent from "./pages/app/CreateEvent";
import ManageEvent from "./pages/app/ManageEvent";
import AdminDashboard from "./pages/admin/AdminDashboard";


//App
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* ===== ÁREA PÚBLICA ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Rota do evento com slug */}
        <Route path="/app/evento/:slug" element={<EventFeed />} />

        {/* ===== ÁREA DO CLIENTE ===== */}
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/criar" element={<CreateEvent />} />
        <Route path="/app/evento/:slug/gerenciar" element={<ManageEvent />} />

        {/* ====== ÁREA RESTRITA ===== */}

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );




}

export default App;
