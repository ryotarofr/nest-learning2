import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SigninDto, SignupDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup/:userType')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body)
  }

  @Post('/signin')
  sugnin(@Body() body: SigninDto) {
    return this.authService.signin(body)
  }

  @Post('/key')
  generateProductKey(@Body() { email, userType }: GenerateProductKeyDto) {
    return this.authService.generateProductKey(email, userType)
  }
}
