import { BadRequestException, Injectable } from '@nestjs/common'
import { Guid } from 'guid-typescript'
import { UpdateCurrentAccountDto } from '../dtos/update-current-account.dto'
import { CurrentAccount } from '../entities/current-account.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCurrentAccountDto } from '../dtos/create-current-account.dto'

@Injectable()
export class CurrentAccountService {
  constructor(
    @InjectRepository(CurrentAccount)
    private repository: Repository<CurrentAccount>,
  ) {}

  async remove(id: Guid): Promise<any> {
    const cc = await this.findOne(id)
    return this.repository.delete(cc)
  }

  add(dto: CreateCurrentAccountDto): Promise<CurrentAccount> {
    const entity = new CurrentAccount(dto.agency)
    return this.repository.save(entity)
  }

  findAll(): Promise<CurrentAccount[]> {
    return this.repository.find({ order: { money: 'DESC' } })
  }

  findOne(id: Guid): Promise<CurrentAccount> {
    return this.repository.findOne(id.toString())
  }

  async update(
    id: Guid,
    dto: UpdateCurrentAccountDto,
  ): Promise<CurrentAccount> {
    if (dto.value == 0) throw new BadRequestException('Valor inválido')

    var cc = await this.findOne(id)

    if (dto.value < 0) {
      if (cc.getMoney() > 0) {
        cc.withdraw(dto.value)
      } else {
        throw new BadRequestException('Conta sem saldo')
      }
    } else {
      cc.deposit(dto.value)
    }

    return this.repository.save(cc)
  }
}
