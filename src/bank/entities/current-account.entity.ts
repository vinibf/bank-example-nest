import { User } from "../../auth/entities/user.entity"
import { BasicEntity } from "../../shared/basic-entity"
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { Operation } from "./operation.entity"

@Entity({name: 'TB_CURRENT_ACCOUNT'})
export class CurrentAccount extends BasicEntity{

    @Column({type:'text', name: 'DS_AGENCY'})
    public agency : string

    @Column({type:'numeric', name: 'VL_MONEY'})
    public money : number = 0

    @OneToMany(type => Operation, operation => operation.origin)
    public originOperations : Operation[]

    @OneToMany(type => Operation, operation => operation.destiny)
    public destinyOperations : Operation[]

    @OneToOne(() => User)
    @JoinColumn()
    public user : User

    constructor(agency: string){
        super()
        this.agency = agency
    }

    withdraw(value: number){
        this.money -= value
    }

    deposit(value: number){
        this.money += value
    }

    getMoney():number{
        return this.money
    }
}