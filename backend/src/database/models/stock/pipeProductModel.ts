import {Table, Model, Column, DataType} from 'sequelize-typescript'

@Table({
  tableName : "pipe_product",
  modelName : "Pipe_Product",
  timestamps : true
})

class PipeProduct extends Model{
  @Column({
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4,
    primaryKey : true
  })
  declare id : string;

  @Column({ type: DataType.STRING(115), allowNull: false })
  declare itemName: string;

  @Column({ type: DataType.STRING(25), allowNull: false })
  declare itemSize: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare itemQuantity: number;

  @Column({ type: DataType.STRING(115), allowNull: false })
  declare itemBrand: string;

  @Column({ type: DataType.STRING(25), allowNull: false })
  declare itemType: string;
}

export default PipeProduct