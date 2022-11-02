import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utilities/user/entities/user.entity';

import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User) private usersRepository: Repository<User>){}
  
  create(newUserDto:CreateUserDto){
    const newUser = new User();
    newUser.username=newUserDto.username;
    return this.usersRepository.save(newUser);
  }

  async findUserByName (name:string): Promise<User>{
    const user= await this.usersRepository.findOne({where:{username:name}}); 
    return user;
  }
  
  async findUserById (id:string): Promise<User>{
    const user= await this.usersRepository.findOne({where:{id:id}}); 
    return user;
  }
}
