import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";

//Swagger//
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('login')
export class AuthController{
  constructor(private authService: AuthService) {}

  @ApiOperation({summary:'Create JWT'})
  @ApiResponse({status: 200, description:'Create JWT'})
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