import jwt from 'jsonwebtoken'


function generateJwtToken(userInfo : {}){
  const secretKey = process.env.JWT_SECRET_KEY
  const expiryDate = process.env.JWT_EXPIRY_DATE

  if(!secretKey || !expiryDate){
    throw new Error('Missing secret key or expiry date')
  }
  const token = jwt.sign(userInfo,secretKey,{expiresIn : Number(expiryDate)})

  return token
  
}

export default generateJwtToken