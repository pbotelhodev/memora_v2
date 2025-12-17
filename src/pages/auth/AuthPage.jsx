import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Phone,
  Watch,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const AuthPage = () => {
  const [pageAtive, setPageAtiva] = useState("login");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  /* handles */
  const handleLogin = (data) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
  };

  const handleCadastro = (data) => {
    setLoading(true);
    console.log(data);

    setLoading(false);
  };

  const handleForgotPassword = (data) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
  };

  // Estilo de gradiente para o texto "recicle"
  const gradientRecicle =
    "bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-cyan-500";

  /* Funções */

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* 1. Header (Logo) */}
      <div className="mb-8 text-center">
        <Link
          to="/"
          className="text-3xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className={gradientRecicle}>memora</span>
        </Link>
        <p className="text-zinc-300 text-sm mt-2">Bem-vindo de volta</p>
      </div>

      {/* 2. O Card Principal */}
      <div className="w-full max-w-sm bg-slate-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          {/* =================== Login =================== */}
          {pageAtive === "login" && (
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
              {/* Campo Email */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-cyan-400 ml-1">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    {...register("emailLogin", { required: true })}
                    type="email"
                    placeholder="exemplo@email.com"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                  />
                </div>
                {errors.emailLogin && (
                  <span className="text-red-500 text-xs">
                    Email obrigatório
                  </span>
                )}
              </div>

              {/* Campo Senha */}
              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-medium text-cyan-400">
                    Senha
                  </label>
                  <button
                    type="button"
                    className="text-xs cursor-pointer text-blue-400 hover:text-blue-300"
                    onClick={() => setPageAtiva("password")}
                  >
                    Esqueci a senha
                  </button>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    {...register("passwordLogin", {
                      required: true,
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                  />
                </div>
                {errors.passwordLogin && (
                  <span className="text-red-500 text-xs">
                    {errors.passwordLogin.message}
                  </span>
                )}
              </div>

              {/* Botão Logar */}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Entrar na Conta
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>
          )}

          {/* =================== Register =================== */}
          {pageAtive === "register" && (
            <form onSubmit={handleSubmit(handleCadastro)} className="space-y-5">
              {/* Campo Email */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-cyan-400 ml-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    {...register("name", {
                      required: "Insira seu nome completo",
                    })}
                    type="text"
                    placeholder="Seu nome"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                  />
                </div>
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-cyan-400 ml-1">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    {...register("email", { required: "Insira o seu email" })}
                    type="email"
                    placeholder="exemplo@email.com"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-cyan-400 ml-1">
                  Whatsapp
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    {...register("whatsapp", {
                      required: "Insira o número de whatsapp",
                    })}
                    type="tel"
                    placeholder="(xx) xxxxx-xxxx"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                  />
                </div>
                {errors.whatsapp && (
                  <span className="text-red-500 text-xs">
                    {errors.whatsapp.message}
                  </span>
                )}
              </div>
              {/* Campo Senha */}
              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-medium text-cyan-400">
                    Senha
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 10,
                        message: "A senha precisa de 10 caracteres",
                      },
                      pattern: {
                        value: /[!@#$%^&*(),.?":{}|<>]/,
                        message:
                          "Sua senha precisa ter pelo menos um caractere especial",
                      },
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                  />
                </div>
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
              {/* Campo Repetir Senha */}
              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-medium text-cyan-400">
                    Repetir a Senha
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    {...register("repeatPassword", {
                      required: "Confirme sua senha",
                      validate: (value) =>
                        value === getValues("password") ||
                        "As senhas não conferem",
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                  />
                </div>
                {errors.repeatPassword && (
                  <span className="text-red-500 text-xs">
                    {errors.repeatPassword.message}
                  </span>
                )}
              </div>
              {/* Botão Cadastrar */}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Cadastrar
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>
          )}

          {/* =================== Esqueci a senha =================== */}
          {pageAtive === "password" && (
            <form
              onSubmit={handleSubmit(handleForgotPassword)}
              className="space-y-5"
            >
              <div className="space-y-1">
                <label className="text-xs font-medium text-cyan-400 ml-1">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    {...register("emailRecovery", { required: true })}
                    type="email"
                    placeholder="exemplo@email.com"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                  />
                </div>
                {errors.emailRecovery && (
                  <span className="text-red-500 text-xs">
                    Insira o email de recuperação
                  </span>
                )}
              </div>
              {/* Botão Enviar codigo */}
              <button
                type="submit"
                /* onClick={() => setPageAtiva("pinCheck")} */
                className="w-full bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Enviar código
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>
          )}
          {pageAtive === "pinCheck" && (
            <form className="space-y-5">
              {/* Campo Senha */}
              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-medium text-cyan-400">
                    Senha
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    {...register("newPassword", { required: true })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                  />
                </div>
                {errors.emailRecovery && (
                  <span className="text-red-500 text-xs">
                    Insira a nova senha
                  </span>
                )}
              </div>
              {/* Campo Repetir Senha */}
              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-medium text-cyan-400">
                    Repetir a Senha
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    {...register("repeatNewPassword", { required: true })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                  />
                </div>
                {errors.emailRecovery && (
                  <span className="text-red-500 text-xs">
                    Repita a nova senha
                  </span>
                )}
              </div>
              <button
                type="submit"
                /* onClick={() => setPageAtiva("login")} */
                className="w-full bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Trocar senha
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>
          )}
        </div>
        {pageAtive === "login" && (
          <div className="bg-zinc-950/50 p-4 text-center border-t border-zinc-800">
            <p className="text-sm text-zinc-500">
              Ainda não possui uma conta?
              <button
                type="button"
                onClick={() => setPageAtiva("register")}
                className="ml-2 cursor-pointer font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Criar agora
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Botão Voltar */}
      {pageAtive !== "login" ? (
        <button
          type="button"
          onClick={() => setPageAtiva("login")}
          className="mt-8 text-sm text-zinc-600 hover:text-cyan-400 transition-colors"
        >
          ← Voltar para o Login
        </button>
      ) : (
        <Link
          to="/"
          className="mt-8 text-sm text-zinc-600 hover:text-cyan-400 transition-colors"
        >
          ← Voltar para o Início
        </Link>
      )}
    </div>
  );
};

export default AuthPage;
