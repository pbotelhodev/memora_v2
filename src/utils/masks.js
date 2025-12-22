// 1. MÁSCARA HÍBRIDA (CPF ou CNPJ) //
export const maskCpfCnpj = (value) => {
  // 1. Remove tudo que não é número
  const cleanValue = value.replace(/\D/g, "");

  // 2. Se tiver 11 dígitos ou menos, aplica máscara de CPF
  if (cleanValue.length <= 11) {
    return cleanValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  // 3. Se tiver mais de 11, aplica máscara de CNPJ
  else {
    return cleanValue
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // Limita ao tamanho do CNPJ
  }
};

// 2. Máscara de CEP (00000-000) //
export const maskCEP = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

// 3. Máscara de Telefone ( (00) 00000-0000 ) //
export const maskPhone = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

// 4. Máscara de Data (DD/MM/AAAA) - Trava em 4 dígitos no ano //
export const maskDate = (value) => {
  return value
    .replace(/\D/g, "") // Só números
    .replace(/(\d{2})(\d)/, "$1/$2") // Dia /
    .replace(/(\d{2})(\d)/, "$1/$2") // Mês /
    .replace(/(\d{4})\d+?$/, "$1"); // Ano (MAX 4 dígitos e para)
};

// 5. Máscara de Cartão de Crédito (0000 0000 0000 0000)
export const maskCardNumber = (value) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/(\d{4})(\d)/, "$1 $2") // Grupo 1
    .replace(/(\d{4})(\d)/, "$1 $2") // Grupo 2
    .replace(/(\d{4})(\d)/, "$1 $2") // Grupo 3
    .replace(/(\d{4})\d+?$/, "$1"); // Grupo 4 (Trava em 16 dígitos)
};

// 6. Máscara Apenas Números (Para CVV e outros)
export const maskOnlyNumbers = (value) => {
  return value.replace(/\D/g, ""); // Simplesmente apaga letras
};
// 7. Máscara de Validade do Cartão (MM/AA)
export const maskCardExpiry = (value) => {
  return value
    .replace(/\D/g, "") // Remove letras/símbolos
    .replace(/(\d{2})(\d)/, "$1/$2") // Adiciona a barra depois do mês
    .replace(/(\/\d{2})\d+?$/, "$1"); // Limita ao ano com 2 dígitos
};

// Limpar Formatação (Para salvar no banco limpo) //
export const unmask = (value) => {
  return value.replace(/\D/g, "");
};
