import { BasicEntity } from "../../shared/basic-entity"
import { Column, Entity, ManyToOne } from "typeorm"
import { CurrentAccount } from "./current-account.entity"

@Entity({name: 'TB_OPERATION' })
export class Operation extends BasicEntity {

  @ManyToOne(type => CurrentAccount, currentAccount => currentAccount.originOperations)
  public origin: CurrentAccount

  @ManyToOne(type => CurrentAccount, currentAccount => currentAccount.destinyOperations,)
  public destiny: CurrentAccount

  @Column({type: 'numeric', name: 'VL_OPERATION'})
  private value: number

  constructor(origin: CurrentAccount, destiny: CurrentAccount, value:number){
    super()
    this.origin = origin
    this.destiny = destiny
    this.value = value
  }
}
