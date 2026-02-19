import { Request, Response } from "express";
import sequelize from "../../database/connection.js";
import { QueryTypes } from "sequelize";
import ColorProduct from "../../database/models/stock/colorProductModel.js";


interface IColorProduct{
  itemName:string,
  itemSize: string,
  itemQuantity : number,
  itemBrand : string,
  itemManufactureDate  : string,
  itemExpiryDate : string
}

class ColorStockController{
  async showAllColorProduct(req:Request, res: Response){
    try{
      const products = await sequelize.query<IColorProduct>(`SELECT * FROM color_product`,{type:QueryTypes.SELECT})
      if(products.length === 0){
        return res.status(404).json({
          "message" : "No Color product found"
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

  async singleColorProduct(req:Request, res: Response){
    try{
      const {id} = req.params
      const [product] = await sequelize.query<IColorProduct>(`SELECT * FROM color_product WHERE id=?`,{type : QueryTypes.SELECT,
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

  async addColorProduct(req : Request, res : Response){
    try{
      if(req.body === undefined){
        return res.status(400).json({
          "message" : "No data are send"
        })
      }
      const {itemName, itemSize, itemBrand, itemQuantity,itemManufactureDate, itemExpiryDate} = req.body
      if(itemName === undefined || itemSize === undefined || itemBrand === undefined || itemQuantity === undefined || itemManufactureDate === undefined || itemExpiryDate === undefined){
        return res.status(400).json({
          "message" : "Please provide itemName, itemSize, itemBrand, itemQuantity,itemManufactureDate, itemExpiryDate"
        })
      }
       await sequelize.query(`INSERT INTO color_product(itemName, itemSize, itemBrand, itemQuantity,itemManufactureDate, itemExpiryDate,id,createdAt,updatedAt) VALUES (?,?,?,?,?,?,UUID(),NOW(),NOW())`,{type : QueryTypes.INSERT,
        replacements : [itemName, itemSize, itemBrand, itemQuantity,itemManufactureDate, itemExpiryDate]
      })

      res.status(201).json({
        "message" : "Color data added successfully"
      })

    }catch(err){
      console.log(err)
      res.status(500).json({
        "message": "Please try again"
      })
    }
  }

  async deleteColorProduct(req : Request, res : Response){
    try{
      const {id} = req.params
      const [isValidId] = await sequelize.query<IColorProduct>(`SELECT * FROM color_product WHERE id=?`,{
        type : QueryTypes.SELECT,
        replacements: [id]
      })
      if(!isValidId){
        return res.status(404).json({
          "message" : "Product not found"
        })
      }
      await sequelize.query(`DELETE FROM color_product WHERE id=?`,{
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

  async updateColorProduct(req: Request, res: Response){
    try{
      const {id} = req.params
      const {itemName, itemSize, itemBrand, itemQuantity,itemManufactureDate, itemExpiryDate} = req.body

      const updateData : Partial<IColorProduct> = {}
      if (itemName !== undefined) updateData.itemName = itemName;
      if (itemSize !== undefined) updateData.itemSize = itemSize;
      if (itemBrand !== undefined) updateData.itemBrand = itemBrand;
      if (itemQuantity !== undefined) updateData.itemQuantity = itemQuantity;
      if (itemManufactureDate !== undefined) updateData.itemManufactureDate = itemManufactureDate;
      if (itemExpiryDate !== undefined) updateData.itemExpiryDate = itemExpiryDate;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No fields provided for update"
      });
    }

      const [isUpdated] = await ColorProduct.update(updateData,{where: {id}})
      if(!isUpdated){
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

export default new ColorStockController()