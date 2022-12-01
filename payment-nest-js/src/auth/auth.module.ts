import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import * as env from 'env-var';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: env.get('PRIVATE_KEY').default('SOME_MSG').required().asString(),
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
