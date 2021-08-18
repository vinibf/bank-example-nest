import { Guid } from "guid-typescript";
import { BasicEntity } from "./basic-entity";

export interface ICrud<TEntity extends BasicEntity>{
    add(dto: any) : Promise<TEntity>
    findOne(id: Guid) : Promise<TEntity>
    findAll() : Promise<TEntity[]>
    remove(id: Guid) : Promise<any>
    update(id: Guid, dto: any) : Promise<TEntity>
}