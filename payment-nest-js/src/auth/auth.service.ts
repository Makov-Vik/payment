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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}


  async login(userDto: CreateUserDto): Promise<JwtObject> {
    try {
      const user = await this.validateUser(userDto);
      if (!user) {
        throw new HttpException({message: "you have not been authenticated yet"}, HttpStatus.FORBIDDEN);
      }

      return this.generateToken(user);      
    } catch (e) {
      return e
    }
  }

  async registration(userDto: CreateUserDto): Promise<JwtObject> {
    try {
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
    } catch (e) {
      return e
    }
  }

  private generateToken(user: UserSchema): JwtObject  {
    const payload = {
      id: user._id,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto): Promise<UserSchema> {
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
