import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) { }

  @Post()
  async createPayment(
    @Res() response: Response,
    @Body() paymentRequestBody: PaymentRequestBody,
  ) {
    try {
      const res = await this.paymentService
      .createPayment(paymentRequestBody)
      return response.status(HttpStatus.CREATED).json(res);
    } catch(e) {
      response.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
}