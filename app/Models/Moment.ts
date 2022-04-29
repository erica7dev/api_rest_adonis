import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'

export default class Moment extends BaseModel {
  @hasMany(() => Comment) //um moment pode ter vários comments, mas um comment só pode pertencer a 1 moment
  public comments: HasMany<typeof Comment>

  @column({ isPrimary: true })
  public id: number

  //add column
  @column()
  public title: string

  @column()
  public description: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
