import { Body, Controller, ExecutionContext, Get, Param, Post, Put, UseGuards, Headers} from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";
import { Guid } from "guid-typescript";
import { BaseController } from "src/shared/base.controller";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller('user')
export class UserController extends BaseController<User>
{
    constructor(private service : UserService){
        super(service)
    }

    @Post()
    override add(dto : UserDto) : Promise<User>{
        return this.service.add(dto)
    }

    @Put(':id')
    //@ApiParam({name: 'id', description: 'id do usuário'})
    override update(@Param('id') id: Guid, dto: UpdateUserDto) : Promise<User>{
        return this.service.update(id, dto)
    }

    @Post('/login')
    login(@Body() dto : UserDto) : Promise<void>{
        return this.service.login(dto)
    }

    @Get('/logout')
    logout() : void{
    }

    @Post('/teste')
    teste(@Headers() headers){

        var base64 = headers['authorization'].split(' ')[1]

        var username = Buffer.from(base64, 'base64').toString().split(':')[0]

        console.log(username)

    }
}