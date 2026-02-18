import {Table, Model, Column, DataType} from 'sequelize-typescript'
import {v4 as uuidv4} from 'uuid'

@Table({
  tableName : 'users',
  modelName : 'Users',
  timestamps : true
})

class User extends Model{
  @Column({
  primaryKey : true,
  type : DataType.UUID,
  defaultValue : ()=> uuidv4(),
  allowNull : false
  })
  declare id: string

  @Column({
    type : DataType.STRING,
    allowNull : false
  })
  declare username : string

  @Column({
    type : DataType.STRING,       
    allowNull : false
  })
  declare email : string

  @Column({
    type : DataType.STRING,
    allowNull : false
  })
  declare password : string
}

export default User