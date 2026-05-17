/**
 * Módulo de Leitura de Passagem
 *
 * v1.0.1 — HOTFIX: adicionada validação de data de expiração da passagem
 */

const BOARDING_PASS_REGEX = /^[A-Z]{2}\d{6}[A-Z0-9]{8}$/;

function lerCodigoPassagem(codigo) {
  if (!codigo || typeof codigo !== 'string') {
    throw new Error('Código de passagem inválido ou ausente.');
  }
  const codigoNormalizado = codigo.trim().toUpperCase();
  if (!BOARDING_PASS_REGEX.test(codigoNormalizado)) {
    return { valido: false, mensagem: 'Formato de passagem não reconhecido.' };
  }
  return {
    valido: true,
    companhia: codigoNormalizado.slice(0, 2),
    numero: codigoNormalizado.slice(2, 8),
    hash: codigoNormalizado.slice(8),
    raw: codigoNormalizado
  };
}

/**
 * HOTFIX: Valida se a passagem está dentro do prazo de uso.
 * Passagens devem ser utilizadas no mesmo dia do voo.
 * @param {string} dataVoo — formato ISO: "2025-05-17"
 */
function validarDataPassagem(dataVoo) {
  if (!dataVoo) {
    return { valida: false, motivo: 'Data do voo não informada.' };
  }
  const hoje = new Date().toISOString().slice(0, 10);
  if (dataVoo < hoje) {
    return { valida: false, motivo: 'Passagem expirada. Data do voo já passou.' };
  }
  if (dataVoo > hoje) {
    return { valida: false, motivo: 'Passagem ainda não disponível para check-in.' };
  }
  return { valida: true, motivo: 'Passagem válida para hoje.' };
}

function simularLeituraScanner() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('PF123456ABCD1234'), 300);
  });
}

module.exports = { lerCodigoPassagem, validarDataPassagem, simularLeituraScanner };
