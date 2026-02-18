import { Request, Response } from "express";
import User from "../../database/models/userModel.js";
import bcrypt from 'bcrypt'
import generateJwtToken from "../../services/generateJwtToken.js";

class AuthController{

  async registerUser(req:Request, res : Response){
    try{
        if(req.body === undefined){
          return res.status(400).json({
            "message" : "No data was send"
          })
        }
        const {username, email, password} = req.body
        if(!username || !password || !email){
          return res.status(400).json({
            "message" : "Please provide the username, email and password"
          })
        }
        
        await User.create({
          username, email, password : bcrypt.hashSync(password,12) 
        })
        return res.status(200).json({
          "message" : "User Register successfully"
        })
    }catch(err){
      console.log(`Error : ${err}`)
      res.status(500).json({
        "message" : "Please try again"
      })
    }
  }

  async loginUser(req: Request , res : Response){

    if(req.body === undefined){
      return res.status(400).json({
            "message" : "No data was send"
          })
    }

    const {email, password} = req.body
    if(!email || !password){
      return res.status(400).json({
        "message" : "Please provide the email and password"
      })
    }
    
    const user = await User.findOne({where :  { email: email}})
    if(!user){
      return res.status(404).json({ "message" : "Email not found"})
    }

    const isPassword = bcrypt.compareSync(password, user.password)
    if(isPassword){
      const token = generateJwtToken({id : user.id})
      return res.status(200).json({
        "message" : "Logged in successfully",
        token
      })
    }
    return res.status(404).json({
      "message" : "Incorrect password"
    })
  }

}

export default new AuthController()