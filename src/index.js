// @flow

const creditCardType = require('credit-card-type');

const fees = {
  AUD: {
    payment: 0.30,
    payout: 0.32,
    isDecimalSupported: true,
  },
  BRL: {
    payment: 0.60,
    payout: 0.50,
    isDecimalSupported: true,
  },
  CAD: {
    payment: 0.30,
    payout: 0.32,
    isDecimalSupported: true,
  },
  CZK: {
    payment: 10.00,
    payout: 6.00,
    isDecimalSupported: true,
  },
  DKK: {
    payment: 2.60,
    payout: 1.50,
    isDecimalSupported: true,
  },
  EUR: {
    payment: 0.35,
    payout: 0.22,
    isDecimalSupported: true,
  },
  HKD: {
    payment: 2.35,
    payout: 1.75,
    isDecimalSupported: true,
  },
  HUF: {
    payment: 90,
    payout: 53,
    isDecimalSupported: false,
  },
  ILS: {
    payment: 1.20,
    payout: 1.00,
    isDecimalSupported: true,
  },
  JPY: {
    payment: 40,
    payout: 30,
    isDecimalSupported: false,
  },
  MXN: {
    payment: 4.00,
    payout: 2.75,
    isDecimalSupported: true,
  },
  MYR: {
    payment: 2.00,
    payout: 0,
    isDecimalSupported: false,
  },
  NZD: {
    payment: 0.45,
    payout: 0.38,
    isDecimalSupported: true,
  },
  NOK: {
    payment: 2.80,
    payout: 1.70,
    isDecimalSupported: true,
  },
  PHP: {
    payment: 15.00,
    payout: 12.50,
    isDecimalSupported: true,
  },
  PLN: {
    payment: 1.35,
    payout: 0.75,
    isDecimalSupported: true,
  },
  RUB: {
    payment: 10,
    payout: 60,
    isDecimalSupported: true,
  },
  SGD: {
    payment: 0.5,
    payout: 0.40,
    isDecimalSupported: true,
  },
  SEK: {
    payment: 3.25,
    payout: 2.25,
    isDecimalSupported: true,
  },
  CHF: {
    payment: 0.55,
    payout: 0.33,
    isDecimalSupported: true,
  },
  TWD: {
    payment: 10.00,
    payout: 8.00,
    isDecimalSupported: false,
  },
  THB: {
    payment: 11.00,
    payout: 9.00,
    isDecimalSupported: true,
  },
  GBP: {
    payment: 0.20,
    payout: 0.17,
    isDecimalSupported: true,
  },
  USD: {
    payment: 0.30,
    payout: 0.25,
    isDecimalSupported: true,
  },
};

module.exports = {
  /**
   * Identifies credit card types and returns the PayPal identifier for it.
   * Useful when processing credit-card charges: https://developer.paypal.com/docs/api/quickstart/payments-credit-card/
   * Supported Enums: https://developer.paypal.com/docs/api/vault/
   * @param {string} cardNumber
   * @returns {string}
   */
  getCreditCardType(cardNumber: string): string {
    const type = creditCardType(cardNumber)[0].type;
    switch (type) {
      case 'master-card':
        return 'mastercard';
      case 'american-express':
        return 'amex';
      case 'visa':
        return 'visa';
      case 'discover':
        return 'discover';
      case 'maestro':
        return 'maestro';
      default:
        return 'unsupported';
    }
  },
  /**
   * Retuns the credit-card processing charges for a payment. Currently 2.9%
   * @param {number} amount
   * @param {string} currency
   * @returns {number}
   */
  getPaymentFee(amount: number, currency: string): number {
    const percentage = 0.029;
    const fee = fees[currency].payment;
    const total = +((amount + fee) / (1 - percentage)).toFixed(2);
    return total - amount;
  },
  /**
   * Returns the PayPal processing charges for a payout.
   * Reference: https://www.paypal.com/us/webapps/mpp/merchant-fees (PayPal Payouts and Mass Pay Fees)
   * @param {number} amount
   * @param {string} currency
   * @returns {number}
   */
  getPayoutFee(amount: number, currency: string): number {
    return fees[currency].payout;
  },
  /**
   * Returns the total PayPal fee (credit-card charge followed by a payout).
   * This can be charged to the sender's card, if you don't want the receiver to pay processing fees
   * Reference: https://www.paypal.com/us/webapps/mpp/merchant-fees (PayPal Payouts and Mass Pay Fees)
   * @param {number} amount
   * @param {string} currency
   * @returns {number}
   */
  getTotalFee(amount: number, currency: string): number {
    const percentage = 0.029;
    const paymentFee = fees[currency].payment;
    const payoutFee = fees[currency].payout;
    const total = +((amount + paymentFee + payoutFee) / (1 - percentage)).toFixed(2);
    return total - amount;
  },
  /**
   * Formats an amount in a particular currency to its PayPal API compatible string representation
   * Reference: https://developer.paypal.com/docs/classic/api/currency_codes/
   * @param {number} amount
   * @param {string} currency
   * @returns {string}
   */
  formatAsString(amount: number, currency: string): string {
    return fees[currency].isDecimalSupported ? amount.toFixed(2) : amount.toFixed(0);
  },
};
