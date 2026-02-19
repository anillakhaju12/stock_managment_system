import type{ Request, Response } from "express";
import sequelize from "../../database/connection.js";
import { QueryTypes} from "sequelize";

interface IPipeProduct {
  id: number;
  itemName: string;
  itemSize: string;
  itemQuantity: number;
  itemBrand: string;
  itemType: string;
  createdAt?: Date;
  updatedAt?: Date;
}


class PipeStockController{
  async showAllPipeProduct(req: Request, res : Response){
    try{
      const pipeProducts = await sequelize.query<IPipeProduct>(`SELECT * FROM pipe_product`,{
        type: QueryTypes.SELECT
      })
      res.status(200).json({
        "message" : "Successfully fetch all pipe products",
        "data" : pipeProducts
      })
    }catch(err){
      console.log(`Error : ${err}`)
      res.status(500).json({
        "message" : "Please try again",
  
      })     
    }
  }
  
  async singlePipeProduct(req:Request, res: Response){
    try{
      const {id} = req.params
      const [product] = await sequelize.query<IPipeProduct>(`SELECT * FROM pipe_product WHERE id = ?`,{type : QueryTypes.SELECT, replacements : [id]})
      if(!product){
        return res.status(404).json({
          "message" : "Product not found"
        })
      }
      res.status(200).json({
        "message" : "Product data fetch successfully",
        "data" : product
      })

    }catch(err){
      console.log(err)
      res.status(500).json({
        "message" : "Please try again"
      })
    }
  }

  async addPipeProduct(req : Request, res : Response){
    try{
        if(req.body === undefined){
          return res.status(400).json({
            "message" : "Please send the data"
          })
        }
        const {itemName, itemSize, itemQuantity, itemBrand, itemType} = req.body
        if(itemName === undefined || itemSize === undefined || itemQuantity === undefined || itemBrand === undefined || itemType === undefined ){
          return res.status(400).json({
            "message" : "Please provide the itemName, itemSize, itemQuantity, itemBrand and itemType"
          })
        }
    
        await sequelize.query(`INSERT INTO pipe_product (id,itemName, itemSize, itemQuantity, itemBrand, itemType, createdAt, updatedAt) VALUES (UUID(),?,?,?,?,?,NOW(),NOW())`,{type : QueryTypes.INSERT,
          replacements :[itemName, itemSize, itemQuantity, itemBrand, itemType]
        })
        res.status(201).json({
          "message" : "Pipe product added successfully"
        })
      }catch(err){
        console.log(`Error : ${err}`)
        res.status(500).json({
          "message" : "Please try again"
        })
      }
  }

  async deletePipeProduct(req: Request, res : Response){
    try{
      const {id} = req.params
      const [isValidId] = await sequelize.query(`SELECT * FROM pipe_product WHERE id=?`,{type: QueryTypes.SELECT, replacements:[id]})
        if(!isValidId){
        return res.status(404).json({
          "message" : "product not found"
        })
      }
      const [isDeleted] = await sequelize.query(`DELETE FROM pipe_product WHERE id=?`,{replacements : [id]})
      if(isDeleted){
        return res.status(200).json({
          "message" : "pipe product deleted successfully"
        })
      }else{
        return res.status(500).json({
          "message" : "Please try again"
        }
        )
      }
    }catch(err){
      console.log(`Error : ${err}`)
      res.status(500).json({
          "message" : "Please try again"
        })
    }
  }

  async updatePipeProduct(req: Request, res:Response){
    try{
      const {id} = req.params
      const {itemName, itemSize, itemQuantity, itemBrand, itemType} = req.body
      const [isValidId] = await sequelize.query(`SELECT * FROM pipe_product WHERE id=?`,{type: QueryTypes.SELECT, replacements:[id]})
      if(!isValidId){
        return res.status(404).json({
          "message" : "product not found"
        })
      }
      //Quick reminder
      // Using COALESCE for partial update:
      // - undefined -> converted to NULL
      // - COALESCE(NULL, column) keeps old value
      // - Only provided fields update
      // NOTE: Cannot intentionally set column to NULL using this method.

      // Partial update using dynamic object:
      // - Only provided fields are added to update object
      // - Safer and more scalable than COALESCE
      // - Allows intentional NULL updates
      // - Better for validation & business logic


      const checkValue = <valueType>(value:valueType | undefined) : valueType | null => value ?? null

      await sequelize.query(`UPDATE pipe_product SET itemName= COALESCE(?,itemName), itemSize=COALESCE(?,itemSize), itemQuantity=COALESCE(?,itemQuantity), itemBrand=COALESCE(?,itemBrand), itemType=COALESCE(?,itemType) WHERE id=?`,{ type : QueryTypes.UPDATE,
        replacements :[checkValue<string>(itemName), checkValue<string>(itemSize), checkValue<number>(itemQuantity), checkValue<string>(itemBrand), checkValue<string>(itemType), id]
      })
      res.status(200).json({
        "message" : "Product updated successfully"
      }
      ) 

    }catch(err){
      console.log(`Error : ${err}`)
      res.status(500).json({
          "message" : "Please try again"
        })
    }
  }

}

export default new PipeStockController()
