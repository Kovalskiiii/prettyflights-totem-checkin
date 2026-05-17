/**
 * Módulo de Leitura de Passagem
 * Feature: leitura-passagem
 *
 * Responsável por capturar e validar o código de barras
 * ou QR Code da passagem do passageiro no totem.
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

function simularLeituraScanner() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('PF123456ABCD1234'), 300);
  });
}

module.exports = { lerCodigoPassagem, simularLeituraScanner };
