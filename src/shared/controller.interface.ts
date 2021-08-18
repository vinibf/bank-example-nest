import { Guid } from "guid-typescript";
import { BasicEntity } from "./basic-entity";
import { ICrud } from "./crud.interface";

export interface IController<TEntity extends BasicEntity> extends ICrud<TEntity>{
    
}