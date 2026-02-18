import {configDotenv} from 'dotenv'
configDotenv()
import app from './app.js'
import './database/connection.js'


const PORT = process.env.PORT || 5000


app.listen(PORT,()=>{
  console.log(`Server running at http://localhost:${PORT}`)
})