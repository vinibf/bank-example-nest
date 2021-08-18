import { CurrentAccount } from "../../bank/entities/current-account.entity";
import { BasicEntity } from "../../shared/basic-entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity({name: "TB_USER"})
export class User extends BasicEntity{

    @Column({type: 'text', name: 'DS_USERNAME'})
    public username : string

    @Column({type: 'text', name: 'DS_PASSWORD'})
    public password : string

    @OneToOne(() => CurrentAccount)
    @JoinColumn()
    public currentAccount: CurrentAccount

    constructor(username:string, password:string){
        super()
        this.username = username
        this.password = password
        //const agency = Math.floor(Math.random() * 5000000).toString()
        //this.currentAccount = new CurrentAccount(agency)
    }
}