import { UserType } from "@prisma/client"
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"


export class SignupDto {
  @IsString({ message: "有効な文字列を入力してください" })
  @IsNotEmpty({ message: "入力必須項目です" })
  name: string

  @Matches(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, { message: "利用可能な番号を入力してください" })
  phone: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(5, { message: "5文字以上にしてください" })
  password: string
}


export class SigninDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}


export class GenerateProductKeyDto {
  @IsEmail()
  email: string

  @IsEnum(UserType)
  userType: UserType
}