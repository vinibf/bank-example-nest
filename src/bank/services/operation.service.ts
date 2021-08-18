import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Guid } from "guid-typescript";
import { BaseService } from "src/shared/base.service";
import { Repository } from "typeorm";
import { CreateOperationDto } from "../dtos/create-operation.dto";
import { CurrentAccount } from "../entities/current-account.entity";
import { Operation } from "../entities/operation.entity";

@Injectable()
export class OperationService extends BaseService<Operation>{

    constructor(
        @InjectRepository(Operation) repo: Repository<Operation>,
        @InjectRepository(CurrentAccount) private accountRepository: Repository<CurrentAccount> ){
        super(repo)
    }

    async add(dto: CreateOperationDto): Promise<Operation> {

        const origin = await this.accountRepository.findOne(dto.originId.toString())

        const destiny = await this.accountRepository.findOne(dto.destinyId.toString())
        
        const operation = new Operation(origin, destiny, dto.value)

        if(origin.getMoney() < dto.value) throw new BadRequestException( { message: "O saldo da conta origem é insuficiente", originMoney: origin.getMoney() })

        origin.withdraw(dto.value)

        destiny.deposit(dto.value)

        await this.accountRepository.update(origin.id, origin)

        await this.accountRepository.update(destiny.id, destiny)

        return this.repository.save(operation)
    }

    update(id: Guid, dto: any): Promise<Operation> {
        throw new Error("Method not implemented.");
    }

}