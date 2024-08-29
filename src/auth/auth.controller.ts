import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '@/decorator/customize';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
    ) {}

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

  @Get('mail')
  @Public()
  testMail() {
    this.mailerService
    .sendMail({
      to: 'thong.nguyenn56@tmi-soft.vn', // list of receivers
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      // html: '<b>welcome</b>', // HTML body content
      template:'register',
      context: {
        name: "Eric",
        activationCode: "1234"
      }
    })
    .then(() => {})
    .catch(() => {});

    return "ok1";
  }
}
