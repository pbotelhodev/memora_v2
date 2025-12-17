import { Resend } from "resend";

const resend = new Resend("re_SmhgKzpq_4Vfjmo74TKdWgQZCA7ugCnht");

(async function () {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["ppbotelho08@gmail.com"],
      subject: "Teste Sandbox Memora 🧪",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Modo de Teste Ativado! 🚧</h2>
          <p>Este e-mail foi enviado sem configurar DNS.</p>
          <p>Seu PIN de teste é: <strong>73241234543</strong></p>
        </div>
      `,
    });

    console.log("E-mail de teste enviado!", data);
  } catch (error) {
    console.error("Erro:", error);
  }
})();
