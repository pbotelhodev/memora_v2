// supabase/functions/create-payment/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // 1. Trata requisição OPTIONS (CORS Preflight)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 2. Pega os dados enviados pelo Front (React)
    const {
      infoUser,
      payment_method,
      data_card,
      event_name,
      plan_tier,
      value,
    } = await req.json();

    // 3. Recupera a API Key do ambiente
    const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY");
    const ASAAS_URL = "https://sandbox.asaas.com/api/v3";

    if (!ASAAS_API_KEY) {
      throw new Error(
        "A variável ASAAS_API_KEY não foi configurada no Supabase."
      );
    }

    // Headers padrão exigidos pelo Asaas
    const asaasHeaders = {
      "Content-Type": "application/json",
      access_token: ASAAS_API_KEY,
    };

    console.log(
      `🚀 Processando: ${infoUser.cpf} via ${payment_method} | Valor: ${value}`
    );

    // ---------------------------------------------------------
    // PASSO A: Verificar ou Criar Cliente no Asaas
    // ---------------------------------------------------------
    let customerId = "";
    const searchRes = await fetch(
      `${ASAAS_URL}/customers?cpfCnpj=${infoUser.cpf}`,
      { headers: asaasHeaders }
    );
    const searchData = await searchRes.json();

    if (searchData.data && searchData.data.length > 0) {
      customerId = searchData.data[0].id;
      console.log("✅ Cliente encontrado:", customerId);
    } else {
      console.log("🆕 Criando novo cliente...");
      const createRes = await fetch(`${ASAAS_URL}/customers`, {
        method: "POST",
        headers: asaasHeaders,
        body: JSON.stringify({
          name: infoUser.name || "Cliente Memora",
          cpfCnpj: infoUser.cpf,
          email: infoUser.email || "contato@memora.com",
          mobilePhone: infoUser.phone || "11999999999",
          address: infoUser.street,
          addressNumber: infoUser.number,
          province: infoUser.neighborhood,
          postalCode: infoUser.cep,
        }),
      });
      const createData = await createRes.json();
      if (createData.errors)
        throw new Error(
          `Erro ao criar cliente: ${createData.errors[0].description}`
        );
      customerId = createData.id;
    }

    // ---------------------------------------------------------
    // PASSO B: Configurar a Cobrança
    // ---------------------------------------------------------
    const billingType =
      payment_method === "pix"
        ? "PIX"
        : payment_method === "boleto"
        ? "BOLETO"
        : "CREDIT_CARD";

    const paymentPayload: any = {
      customer: customerId,
      billingType: billingType,
      value: value || 199.9, // Usa o valor enviado pelo front
      dueDate: new Date().toISOString().split("T")[0],
      description: `Evento Memora: ${event_name} (${plan_tier})`,
    };

    // Dados específicos para Cartão de Crédito
    if (billingType === "CREDIT_CARD" && data_card) {
      paymentPayload.creditCard = {
        holderName: data_card.card_name,
        number: data_card.card_number,
        expiryMonth: data_card.card_expiry.split("/")[0],
        expiryYear: `20${data_card.card_expiry.split("/")[1]}`,
        ccv: data_card.card_cvv,
      };
      paymentPayload.creditCardHolderInfo = {
        name: data_card.card_name,
        email: infoUser.email || "contato@memora.com",
        cpfCnpj: infoUser.cpf,
        postalCode: infoUser.cep,
        addressNumber: infoUser.number,
        mobilePhone: infoUser.phone || "11999999999",
      };
    }

    // ---------------------------------------------------------
    // PASSO C: Enviar Cobrança ao Asaas
    // ---------------------------------------------------------
    console.log("💸 Solicitando cobrança...");
    const paymentRes = await fetch(`${ASAAS_URL}/payments`, {
      method: "POST",
      headers: asaasHeaders,
      body: JSON.stringify(paymentPayload),
    });
    const paymentData = await paymentRes.json();

    if (paymentData.errors) {
      throw new Error(`Erro Asaas: ${paymentData.errors[0].description}`);
    }

    // ---------------------------------------------------------
    // PASSO D: Buscar dados do PIX (se aplicável)
    // ---------------------------------------------------------
    let pixData = null;
    if (billingType === "PIX") {
      const pixRes = await fetch(
        `${ASAAS_URL}/payments/${paymentData.id}/pixQrCode`,
        { headers: asaasHeaders }
      );
      pixData = await pixRes.json();
    }

    // 5. Retorno Final de Sucesso
    return new Response(
      JSON.stringify({
        success: true,
        paymentId: paymentData.id,
        status: paymentData.status,
        pix: pixData, // Contém encodedImage e payload
        boletoUrl: paymentData.bankSlipUrl,
        client_feedback: "Pagamento processado com sucesso!",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Erro Geral:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
