import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.SECRET_STRIPE_KEY, {
      apiVersion: '2022-08-01',
    });
  }

  createPayment(paymentRequestBody: PaymentRequestBody): Promise<any> {
    let sumAmount = 0;
    paymentRequestBody.products.forEach((product) => {
      sumAmount = sumAmount + product.price * product.quantity;
    });
    return this.stripe.charges.create({
      source: paymentRequestBody.sourse,
      amount: sumAmount * 100,
      currency: paymentRequestBody.currency,
      customer: paymentRequestBody.customer,
    }).catch(function(e) {
      console.log(e, '!!!')
    })
    // return this.stripe.paymentIntents.create({
    //   amount: 100 , //sumAmount * 100,
    //   currency: paymentRequestBody.currency,
    // });
  }



}