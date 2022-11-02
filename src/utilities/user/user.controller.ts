import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    create(@Body() createUserDto:CreateUserDto):Promise<User>{
      return this.userService.create(createUserDto);
    }

    @Get(':name')
    findUserByName(@Param('name') name:string):Promise<User>{
      return this.userService.findUserByName(name);
    }

    @Get(':id')
    findUserById(@Param('id') id:string):Promise<User>{
      return this.userService.findUserById(id);
    }
}