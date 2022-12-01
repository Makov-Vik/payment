import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
//import { ENCODING_SALT } from '../constants';
//import { User } from 'src/user/user.schema';
//import * as Response from '../response.messages';
//import { mailer } from '../nodemailer';
//import * as dotenv from 'dotenv';
//import * as env from 'env-var';
//import { User } from '../user/user.model';
//import { LogService } from '../log/log.service';
//dotenv.config({path: `.${env.get('NODE_ENV').required().asString()}.env`});

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    if (!user) {
      throw new HttpException({message: "you have not been authenticated yet"}, HttpStatus.FORBIDDEN);
    }

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException({ message: 'user with same email already exist' }, HttpStatus.BAD_REQUEST);
    }

    //maybe ENCODING_SALT must be in constant file instead
    const hashPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    

    return this.generateToken(user);
  }

  private async generateToken(user: userSchema) {
    const payload = {
      id: user._id,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException('WRONG_EMAIL_OR_PASSWORD');
    }
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (!passwordEqual) {
      throw new UnauthorizedException('WRONG_EMAIL_OR_PASSWORD');
    }
    return user;
  }
}
