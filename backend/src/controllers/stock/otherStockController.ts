import { Request, Response } from "express";
import sequelize from "../../database/connection.js";
import { QueryTypes } from "sequelize";
import OtherProduct from "../../database/models/stock/otherProductModel.js";

interface IOtherProduct{
  itemName:string,
  itemSize: string,
  itemQuantity : number,
  itemBrand : string
}

class OtherStockController{
  async showAllOtherProduct(req:Request, res: Response){
    try{
      const products = await sequelize.query<IOtherProduct>(`SELECT * FROM other_product`,{type:QueryTypes.SELECT})
      if(products.length === 0){
        return res.status(404).json({
          "message" : "No Other product found"
        })
      }
      res.status(200).json({
        "message" : "Data fetch successfully",
        "data" : products
      })
    }catch(err){
      console.log(err)
      res.status(500).json({
        "message": "Please try again"
      })
    }
  
  }

  async singleOtherProduct(req:Request, res: Response){
    try{
      const {id} = req.params
      const [product] = await sequelize.query<IOtherProduct>(`SELECT * FROM other_product WHERE id=?`,{type : QueryTypes.SELECT,
        replacements: [id]
      })
      if(!product){
        return res.status(400).json({
          "message" : "Product not found"
        })
      }
      res.status(200).json({
        "message" : "Product fetch successfully",
        "data" : product
      })
    }catch(err){
      console.log(err)
      res.status(500).json({
        "message": "Please try again"
      })
    }
  }

  async addOtherProduct(req : Request, res : Response){
    try{
      if(req.body === undefined){
        return res.status(400).json({
          "message" : "No data are send"
        })
      }
      const {itemName, itemSize, itemBrand, itemQuantity} = req.body
      if(!itemName || !itemBrand || !itemQuantity){
        return res.status(400).json({
          "message" : "Please provide itemName, itemSize, itemBrand, itemQuantity"
        })
      }
       await sequelize.query(`INSERT INTO other_product(itemName, itemSize, itemBrand, itemQuantity) VALUES (?,?,?,?)`,{type : QueryTypes.INSERT,
        replacements : [itemName, itemSize, itemBrand, itemQuantity]
      })

      res.status(201).json({
        "message" : "Other data added successfully"
      })
    }catch(err){
      console.log(err)
      res.status(500).json({
        "message": "Please try again"
      })
    }
  }

  async deleteOtherProduct(req : Request, res : Response){
    try{
      const id = req.params
      const [isValidId] = await sequelize.query<IOtherProduct>(`SELECT * FROM other_product WHERE id=?`,{
        type : QueryTypes.SELECT,
        replacements: [id]
      })
      if(!isValidId){
        return res.status(404).json({
          "message" : "Product not found"
        })
      }
      await sequelize.query(`DELETE FROM other_product WHERE id=?`,{
        type : QueryTypes.DELETE,
        replacements: [id]
      })
      res.status(200).json({
        "message" : "Product deleted successfully"
      })
    }catch(err){
      console.log(err)
      res.status(500).json({
        "message": "Please try again"
      })
    }
  }

  async updateOtherProduct(req: Request, res: Response){
    try{
      const {id} = req.params
      const {itemName, itemSize, itemBrand, itemQuantity} = req.body
      const updateData : Partial<IOtherProduct> = {}
      if(itemName !== undefined) updateData.itemName = itemName
      if(itemSize !== undefined) updateData.itemSize = itemSize
      if(itemBrand !== undefined) updateData.itemBrand = itemBrand
      if(itemQuantity !== undefined) updateData.itemQuantity = itemQuantity

      if(Object.keys(updateData).length === 0){
        return res.status(400).json({
          "message" : "No fields provided"
        })
      }
      const [isUpdate] = await OtherProduct.update(updateData,{where: {id}})
      if(!isUpdate){
        return res.status(404).json({
          "message" : "Product not found"
        })
      }
      res.status(200).json({
        "message" : "Product updated successfully"
      })
    }catch(err){
      console.log(err)
      res.status(500).json({
        "message": "Please try again"
      })
    }
  }


}

export default new OtherStockController()