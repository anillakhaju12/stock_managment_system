import { Request, Response } from "express";
import sequelize from "../../database/connection.js";
import { QueryTypes } from "sequelize";
import SanitaryProduct from "../../database/models/stock/sanitaryProductModel.js";

interface ISanitaryProduct{
  itemName:string,
  itemSize: string,
  itemQuantity : number,
  itemBrand : string
}

class SanitaryStockController{
  async showAllSanitaryProduct(req:Request, res: Response){
    try{
      const products = await sequelize.query<ISanitaryProduct>(`SELECT * FROM sanitary_product`,{type:QueryTypes.SELECT})
      if(products.length === 0){
        return res.status(404).json({
          "message" : "No Sanitary product found"
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

  async singleSanitaryProduct(req:Request, res: Response){
    try{
      const {id} = req.params
      const [product] = await sequelize.query<ISanitaryProduct>(`SELECT * FROM sanitary_product WHERE id=?`,{type : QueryTypes.SELECT,
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

  async addSanitaryProduct(req : Request, res : Response){
    try{
      if(req.body === undefined){
        return res.status(400).json({
          "message" : "No data are send"
        })
      }
      const {itemName, itemSize, itemBrand, itemQuantity} = req.body
      if(itemName === undefined || itemBrand === undefined || itemQuantity === undefined){
        return res.status(400).json({
          "message" : "Please provide itemName, itemSize, itemBrand, itemQuantity"
        })
      }
      const newItemSize = itemSize === undefined ? null : itemSize
       await sequelize.query(`INSERT INTO sanitary_product(id,itemName, itemSize, itemBrand, itemQuantity, createdAt, updatedAt) VALUES (UUID(),?,?,?,?,NOW(),NOW())`,{type : QueryTypes.INSERT,
        replacements : [itemName, newItemSize, itemBrand, itemQuantity]
      })

      res.status(201).json({
        "message" : "Sanitary data added successfully"
      })

    }catch(err){
      console.log(err)
      res.status(500).json({
        "message": "Please try again"
      })
    }
  }

  async deleteSanitaryProduct(req : Request, res : Response){
    try{
      const {id} = req.params
      const [isValidId] = await sequelize.query<ISanitaryProduct>(`SELECT * FROM sanitary_product WHERE id=?`,{
        type : QueryTypes.SELECT,
        replacements: [id]
      })
      if(!isValidId){
        return res.status(404).json({
          "message" : "Product not found"
        })
      }
      await sequelize.query(`DELETE FROM sanitary_product WHERE id=?`,{
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

  async updateSanitaryProduct(req: Request, res: Response){
    try{
      const {id} = req.params
      const {itemName, itemSize, itemBrand, itemQuantity} = req.body

      const udpateData : Partial<ISanitaryProduct> = {}

      if(itemName !== undefined) udpateData.itemName = itemName
      if(itemSize !== undefined) udpateData.itemSize = itemSize
      if(itemBrand !== undefined) udpateData.itemBrand = itemBrand
      if(itemQuantity !== undefined) udpateData.itemQuantity = itemQuantity

      if(Object.keys(udpateData).length === 0){
        return res.status(400).json({
          "message" : "No fields provided"
        })
      }

      const [isUpdate] = await SanitaryProduct.update(udpateData,{where: {id}})
      if(!isUpdate){
        return res.status(404).json({
          "message" : "Data not found"
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

export default new SanitaryStockController()