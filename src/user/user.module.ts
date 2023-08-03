import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [UserController],
  providers: [AuthService]
})
export class UserModule {}
