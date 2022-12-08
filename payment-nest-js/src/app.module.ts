import { Module } from '@nestjs/common';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PaymentModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_CONNECT_STRING}`),
    UserModule,
    AuthModule,
    ProductModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class AppModule {}
