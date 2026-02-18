import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import sequelize from "../database/connection.js";
import { QueryTypes } from "sequelize";


interface User {
  id: string,
  username : string,
  email : string,
  password : string
}

interface AuthUser extends Request {
  user?: User;
}

async function isLoggedIn(req: AuthUser, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Missing token. Unauthorized access denied!!",
      });
    }
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader
    if (!token) {
      return res.status(401).json({ "message" : "Invalid token format" });
    }
    const secretKey = process.env.JWT_SECRET_KEY
    if (!secretKey) {
      console.log("Missing token secret key")
      return res.status(500).json({
        message: "Please try again",
      });
    }
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    const [user] = await sequelize.query<User>(`SELECT * FROM users WHERE id = ?`, {
      type: QueryTypes.SELECT,
      replacements: [decoded.id],
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Token. Access Denied",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    if(err instanceof jwt.JsonWebTokenError){
      return res.status(401).json({
        "message" : "Invalid or expired token"
      })
    }
    console.log(`Error : ${err}`);
    res.status(500).json({
      message: "Please try again",
    });
  }
}

export default isLoggedIn
