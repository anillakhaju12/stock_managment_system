import {Table, Model, Column, DataType} from 'sequelize-typescript'

@Table({
  tableName : "sanitary_product",
  modelName : "Sanitary_Product",
  timestamps : true
})

class SanitaryProduct extends Model{
  @Column({
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4,
    primaryKey : true
  })
  declare id : string;

  @Column({ type: DataType.STRING(115), allowNull: false })
  declare itemName: string;

  @Column({ type: DataType.STRING(25)})
  declare itemSize: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare itemQuantity: number;

  @Column({ type: DataType.STRING(115), allowNull: false })
  declare itemBrand: string;

}

export default SanitaryProduct