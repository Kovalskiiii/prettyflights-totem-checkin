# Changelog — PrettyFlights Totem de Check-in

## [1.0.0] - 2025-05-17

### Adicionado
- Módulo de leitura e validação de código de passagem (boarding pass)
- Suporte a QR Code e código de barras no scanner do totem
- Testes unitários para validação de passagem
- Documentação de diretrizes GitFlow

### Estrutura
- `src/checkin/passagem.js` — leitura e validação
- `src/checkin/index.js` — ponto de entrada do módulo
- `tests/passagem.test.js` — testes unitários
