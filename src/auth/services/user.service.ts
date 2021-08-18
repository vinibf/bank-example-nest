import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Guid } from "guid-typescript";
import { CurrentAccount } from "src/bank/entities/current-account.entity";
//import { CurrentAccount } from "src/bank/entities/current-account.entity";
//import { CurrentAccountService } from "src/bank/services/current-account.service";
import { BaseService } from "src/shared/base.service";
import { Repository } from "typeorm";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";
import { SessionService } from "./session.service";

@Injectable()
export class UserService extends BaseService<User>{

    constructor(@InjectRepository(User) repo : Repository<User>, private session: SessionService){
        super(repo)
    }

    async add(dto: UserDto): Promise<User> {

        const user = new User(dto.username, dto.password)

        return this.repository.save(user)
    }

    // override findOne(id: Guid) : Promise<User>{

    //     console.log('passou')

    //     return this.repository.createQueryBuilder('user')
    //     .innerJoin('user.currentAccount', 'currentAccount', 'currentAccount.userId = user.currentAccountId')
    //     .where('user.id =: id', { id })
    //     .getOne()
    // }

    async update(id: Guid, dto: UpdateUserDto): Promise<User> {
        
        const user = await this.repository.findOne(id.toString())

        user.password = dto.password

        return this.repository.save(user)
    }

    async login(dto: UserDto) : Promise<void> {

        const user = await this.repository.findOne({username : dto.username})

        if(!user) throw new NotFoundException()

        if(user.password != dto.password) throw new UnauthorizedException()

        this.session.add(user.username)
    }

    async logout(dto: UserDto) : Promise<void> {
        this.session.remove(dto.username)
    }

}