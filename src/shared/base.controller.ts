import { Body, Delete, Get, Param, Put, UsePipes, ValidationPipe } from "@nestjs/common"
import { Post } from "@nestjs/common"
import { Guid } from "guid-typescript"
import { BasicEntity } from "./basic-entity"
import { IController } from "./controller.interface"
import { IService } from "./service.inteface"

export abstract class BaseController<TEntity extends BasicEntity> implements IController<TEntity> {

    constructor(private _service: IService<TEntity>) {}
  
    @Post()
    add(@Body() dto: any): Promise<TEntity> {
      return this._service.add(dto)
    }
  
    @Get(':id')
    findOne(@Param('id') id: Guid): Promise<TEntity> {
      return this._service.findOne(id)
    }
  
    @Get()
    findAll(): Promise<TEntity[]> {
      return this._service.findAll()
    }
  
    @Delete(':id')
    remove(@Param('id') id: Guid): Promise<any> {
      return this._service.remove(id)
    }
  
    @Put(':id')
    update(@Param('id') id: Guid, @Body() dto: any): Promise<TEntity> {
      return this._service.update(id, dto)
    }
  }