import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from 'src/product/products.schema';
import { UserService } from 'src/user/user.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private userService: UserService) {
    this.stripe = new Stripe(process.env.SECRET_STRIPE_KEY, {
      apiVersion: '2022-08-01',
    });
  }

  async createPayment(paymentRequestBody: PaymentRequestBody): Promise<unknown> {
    let sumAmount = 0;
    paymentRequestBody.products.forEach((product) => {
      sumAmount = sumAmount + product.price * product.quantity;
    });

    let res;
    const ids = paymentRequestBody.products.map(item => String(item.id));
    try {
      res = await this.userService.addUserProduct(paymentRequestBody.email, ids)
    } catch(e) {
      return new Error('Unable add id of product to user');
    } finally { 
      if (res.modifiedCount === 0) throw new HttpException({
        message: 'Unable add id of product to user' },
        HttpStatus.BAD_REQUEST);
    }
    return this.stripe.paymentIntents.create({
      amount: sumAmount * 100,
      currency: paymentRequestBody.currency,
    });
  }
}