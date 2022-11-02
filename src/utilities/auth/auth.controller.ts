import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('login')
export class AuthController{
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() newUser:CreateUserDto):Promise<{access_token:string}>{
    const name= newUser.username;
    const valid = await this.authService.validateUser(name);
    if(!valid){
      throw new UnauthorizedException;
    }
    return await this.authService.generateAccessToken(name);
  }

}