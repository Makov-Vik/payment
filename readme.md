# Payment integration with stripe

## Description
I have separated the frontend and backend into two corresponding folders.
I used React on the frontend. 

To implement the payment, I used the following scheme:

![alt text](https://miro.medium.com/max/828/1*i8eUDQxZdwa2NsTKj0BR7g.webp)

As you can see, after the main payment call, I add the payment method and confirm the card payment in the front-end.
The main call contain products and currency, you can see it in *payment-front/src/services/PaymentIntentService.js*
create payment method and confirm the card payment you can see in *payment-front/src/components/StripeCheckoutComponent/StripeCheckout.js*

## Start app
For start front or back use:
```
npm run start
```

Back will start in 3001 port, Front in 3000 port.