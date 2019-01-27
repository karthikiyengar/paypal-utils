# paypal-utils [DEPRECATED]

A utility library that helps you when using the PayPal node.js API. This library also helps you calculate the payment (credit-card charge) and payout fees, which can be useful if you want to charge the fees to the sender. Currently, there is no method to derive the fees directly from the PayPal API. This library uses the PayPal official fee structure documented at https://www.paypal.com/us/webapps/mpp/merchant-fees for its calculations. This is particularly useful in marketplace type transactions.


# API

### getCreditCardType(cardNumber: string) : string 

Identifies credit card types and returns the PayPal identifier for it. This is useful when processing credit-card charges. Supported card types include `visa, mastercard, discover and maestro` as specified here: https://developer.paypal.com/docs/api/vault/

### getPaymentFee(amount: number, currency: string): number

Returns the amount to be charged if you want to include the credit-card processing charges for a payment. Currently 2.9%

### getPayoutFee(amount: number, currency: string): number

Returns the PayPal processing charges for a payout. Currently, only the flat fee is supported. Refer section `PayPal Payouts and Mass Pay Fees` here: 
https://www.paypal.com/us/webapps/mpp/merchant-fee

### getTotalFee(amount: number, currency: string): number 

Returns the total PayPal fee inclusive of both the payment and payout fee. Charge the sender with this amount in the recipient's currency if you don't want the receiver to pay processing fees. Reference: https://www.paypal.com/us/webapps/mpp/merchant-fees

### formatAsString(amount: number, currency: string): string

Formats an amount in a particular currency to its PayPal API compatible string representation with appropriate rounding for use in APIs: https://developer.paypal.com/docs/classic/api/currency_codes/
