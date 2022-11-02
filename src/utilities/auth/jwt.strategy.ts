import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from '../user/user.service';
import { JWTPayload } from './interface/jwtPayload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private userService:UserService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: 'secret', 
    });
  }

  async validate(payload: JWTPayload):Promise<any>{
    const user = await this.userService.findUserById(payload.userId);
    if(!user){
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }


}