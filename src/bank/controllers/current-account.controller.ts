import { Body, Delete, Put } from '@nestjs/common'
import { Param } from '@nestjs/common'
import { Controller, Get, Post } from '@nestjs/common'
import { Guid } from 'guid-typescript'
import { IController } from 'src/shared/controller.interface'
import { CreateCurrentAccountDto } from '../dtos/create-current-account.dto'
import { CurrentAccount } from '../entities/current-account.entity'
import { UpdateCurrentAccountDto } from '../dtos/update-current-account.dto'
import { CurrentAccountService } from '../services/current-account.service'

@Controller('current-account')
export class CurrentAccountController implements IController<CurrentAccount> {
  constructor(private service: CurrentAccountService) {}

  @Post()
  add(@Body() dto: CreateCurrentAccountDto): Promise<CurrentAccount> {
    return this.service.add(dto)
  }

  @Get(':id')
  findOne(@Param('id') id: Guid): Promise<CurrentAccount> {
    return this.service.findOne(id)
  }

  @Get()
  findAll(): Promise<CurrentAccount[]> {
    return this.service.findAll()
  }

  @Delete(':id')
  remove(@Param('id') id: Guid): Promise<any> {
    return this.service.remove(id)
  }

  @Put(':id')
  update(
    @Param('id') id: Guid,
    @Body() dto: UpdateCurrentAccountDto,
  ): Promise<CurrentAccount> {
    return this.service.update(id, dto)
  }
}
