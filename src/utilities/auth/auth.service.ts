import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt'; 
import { User } from "../user/entities/user.entity";
import { JWTPayload } from "./interface/jwtPayload.interface";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
              private jwtService: JwtService) {}

  async validateUser(username: string): Promise<User> {
    return await this.usersService.findUserByName(username);
  }

  async generateAccessToken(name:string){
    const validatedUser= await this.validateUser(name);
    const payload : JWTPayload= {userId:validatedUser.id};
    //console.log(this.jwtService.sign(payload));
    return{
      access_token: this.jwtService.sign(payload)
    }
  }
}