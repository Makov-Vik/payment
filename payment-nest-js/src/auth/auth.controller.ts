import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, Req, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipe/validation.pipe';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, 
    private userService: UserService,
  ){}

  @UsePipes(ValidationPipe)
  @Get('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

}
