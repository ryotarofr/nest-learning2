import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken';
import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from '@prisma/client';

interface SignupPrams {
  name: string
  phone: string
  email: string
  password: string
}

interface SigninPrams {
  email: string
  password: string
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) { }
  async signup({ email, password, name, phone }: SignupPrams) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      }
    })

    if (userExists) {
      throw new ConflictException()
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
        user_type: UserType.BUYER,
      }
    })

    return this.generateJWT(user.name, user.id)
  }

  async signin({ email, password }: SigninPrams) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      }
    })

    if (!user) {
      throw new HttpException("無効なメールアドレスです。", 400)
    }

    const hashedPassword = user.password

    const invalidPassword = await bcrypt.compare(password, hashedPassword)

    if (!invalidPassword) {
      throw new HttpException("無効なメールアドレスです。", 400)
    }

    return this.generateJWT(user.name, user.id)
  }


  private generateJWT(name: string, id: number) {
    return jwt.sign({
      name,
      id,
    }, process.env.JSON_TOKEN_KEY, {
      expiresIn: 360000
    })

  }

  generateProductKey(email: string, userType: UserType) {
    const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`

    return bcrypt.hash(string, 10)
  }
}
