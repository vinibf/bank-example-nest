import { BasicEntity } from "./basic-entity";
import { ICrud } from "./crud.interface";

export interface IService<TEntity extends BasicEntity> extends ICrud<TEntity>{
}
  