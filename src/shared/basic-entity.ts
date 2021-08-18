import { Guid } from 'guid-typescript'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export abstract class BasicEntity {

  @PrimaryColumn({type: 'uuid', name: 'ID' })
  public id: string

  @Column({type: 'date', name: 'DT_CREATED'})
  public createdAt: Date

  constructor() {
    this.id = Guid.create().toString()
    this.createdAt = new Date()
  }
}