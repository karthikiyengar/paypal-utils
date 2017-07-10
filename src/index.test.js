const utils = require('./index');

describe('payment fees tests', () => {
  test('for usd', () => {
    expect(utils.getPaymentFee(100, 'USD')).toBeCloseTo(3.3);
  });
});

/**
 * Use the paypal sandbox to test - the balance after payment and payout should net to zero.
 */
describe('total fees tests', () => {
  test('for usd', () => {
    expect(utils.getTotalFee(100, 'USD')).toBeCloseTo(3.55);
    expect(utils.getTotalFee(5, 'USD')).toBeCloseTo(0.72);
  });
});


describe('credit card types', () => {
  test('american express', () => {
    expect(utils.getCreditCardType('378307932652996')).toBe('amex');
    expect(utils.getCreditCardType('342419206316878')).toBe('amex');
    expect(utils.getCreditCardType('373499565859991')).toBe('amex');
  });
  test('visa', () => {
    expect(utils.getCreditCardType('4916071484612722')).toBe('visa');
    expect(utils.getCreditCardType('4485928776884908')).toBe('visa');
    expect(utils.getCreditCardType('4929424654857696353')).toBe('visa');
  });
  test('mastercard', () => {
    expect(utils.getCreditCardType('5231036400282624')).toBe('mastercard');
    expect(utils.getCreditCardType('5281668763083543')).toBe('mastercard');
    expect(utils.getCreditCardType('5327934722137606')).toBe('mastercard');
  });
  test('discover', () => {
    expect(utils.getCreditCardType('6011421992950529')).toBe('discover');
    expect(utils.getCreditCardType('6011103651285278')).toBe('discover');
    expect(utils.getCreditCardType('6011271881256942042')).toBe('discover');
  });
  test('maestro', () => {
    expect(utils.getCreditCardType('5020074340488055')).toBe('maestro');
    expect(utils.getCreditCardType('6759132295979646')).toBe('maestro');
    expect(utils.getCreditCardType('6762450667108668')).toBe('maestro');
  });
  test('unsupported', () => {
    expect(utils.getCreditCardType('3544693311182413')).toBe('unsupported'); // JCB
    expect(utils.getCreditCardType('36368170741200')).toBe('unsupported'); // Diner's Club
    expect(utils.getCreditCardType('30418027108776')).toBe('unsupported'); // Diner's Club
  });
});
