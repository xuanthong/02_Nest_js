import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '@/decorator/customize';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { Public } from '@/decorator/customize';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post("login")
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.signIn(
  //       createAuthDto.username,
  //       createAuthDto.password
  //     );
  // }

  @Post("login")
  @Public()
  @UseGuards(AuthGuard('local'))
  async handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }
}
