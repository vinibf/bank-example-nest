import { Controller, Post } from '@nestjs/common'
import { BaseController } from 'src/shared/base.controller'
import { CreateOperationDto } from '../dtos/create-operation.dto'
import { Operation } from '../entities/operation.entity'
import { OperationService } from '../services/operation.service'

@Controller('operation')
export class OperationController extends BaseController<Operation> {

  constructor(private service: OperationService) {
    super(service)
  }

  @Post()
  override add(dto: CreateOperationDto) : Promise<Operation>{
    
    //dto.originId = //id da conta de quem está logado
    
    return this.service.add(dto)
  }
}
