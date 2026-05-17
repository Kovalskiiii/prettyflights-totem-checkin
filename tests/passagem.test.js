const { lerCodigoPassagem } = require('../src/checkin/passagem');

describe('lerCodigoPassagem', () => {
  test('valida passagem com formato correto', () => {
    const resultado = lerCodigoPassagem('PF123456ABCD1234');
    expect(resultado.valido).toBe(true);
    expect(resultado.companhia).toBe('PF');
  });

  test('rejeita passagem com formato incorreto', () => {
    const resultado = lerCodigoPassagem('INVALIDO');
    expect(resultado.valido).toBe(false);
  });

  test('lança erro para entrada nula', () => {
    expect(() => lerCodigoPassagem(null)).toThrow();
  });
});
