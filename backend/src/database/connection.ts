import { Sequelize} from "sequelize-typescript"
import User from "./models/userModel.js"
import {configDotenv} from "dotenv";
import ColorProduct from "./models/stock/colorProductModel.js";
import PipeProduct from "./models/stock/pipeProductModel.js";
import SanitaryProduct from "./models/stock/sanitaryProductModel.js";
import OtherProduct from "./models/stock/otherProductModel.js";

configDotenv()
//Check env variable
function checkEnvVariable(name: string, allowEmpty: boolean = false):string{
  const value = process.env[name]
  if(value === undefined){
    throw new Error(`Cannot find the value of ${name}`)
  }
  if(value === "" && !allowEmpty){
    throw new Error(`The value of ${name} is empty`)
  }
  return value
}

const sequelize = new Sequelize({
  database : checkEnvVariable('DB_NAME'),
  username : checkEnvVariable('DB_USERNAME'),
  password : checkEnvVariable('DB_PASSWORD', true),
  host : checkEnvVariable('DB_HOST'),
  dialect : "mysql",
  port : Number(checkEnvVariable('DB_PORT') ?? 3306),
  models : [User, ColorProduct, PipeProduct, SanitaryProduct, OtherProduct]
})

sequelize.authenticate().then(()=>{
  console.log(`Database connected`)
}).catch(err =>{
  console.log(`Error : ${err}`)
})

sequelize.sync({alter:false}).then(()=>{
  console.log('Database Migration Successfully')
}).catch(err=>{
  console.log(`Error : ${err}`)
})

export default sequelize