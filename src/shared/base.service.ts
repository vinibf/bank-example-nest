import { Guid } from "guid-typescript";
import { Repository } from "typeorm";
import { BasicEntity } from "./basic-entity";
import { IService } from "./service.inteface";

export abstract class BaseService<TEntity extends BasicEntity> implements IService<TEntity> {
    
    constructor(protected repository: Repository<TEntity>){}

    abstract add(dto: any): Promise<TEntity>

    abstract update(id: Guid, dto: any): Promise<TEntity>

    findAll() : Promise<TEntity[]>{
        return this.repository.find()
    }

    findOne(id: Guid) : Promise<TEntity>{
        return this.repository.findOne(id.toString())
    }

    async remove(id: Guid) : Promise<any> {
        const cc = await this.findOne(id)
        return this.repository.delete(cc)
    }
}