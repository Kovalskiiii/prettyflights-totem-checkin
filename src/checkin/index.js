// Módulo principal de check-in — PrettyFlights Totem
const { lerCodigoPassagem, simularLeituraScanner } = require('./passagem');

module.exports = {
  version: '1.0.0',
  module: 'totem-checkin',
  lerCodigoPassagem,
  simularLeituraScanner
};
