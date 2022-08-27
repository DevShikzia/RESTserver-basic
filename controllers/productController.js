import {request, response } from "express";
import {Product, Category} from "../models/index.js"


// Obtener Products - paginado - total - populate

const getAllProducts = async(req = request,res = response) => {
    
    const {limit = 5, skip = 0} = req.query;
    const query = {state:true}

    const [total,products] = await Promise.all([
                                 Product.countDocuments(query),
                                 Product.find(query)
                                      .limit(limit)
                                      .skip(skip)
                                      .populate('user','name')
                                      .populate('category','name')
             
])



    res.json({
        total,
        products,
    })

}


// Obtener Product - populate {}

const getOneProduct =  async(req,res) => {

    const {id} = req.params;

                               // ({ _id : id })
    const product = await Product.findById(id)
                                            .populate('user','name')
                                            .populate('category','name')
  
    res.json({
        product
    })


}




const createProduct = async(req = request, res = response ) =>{
    
   

 const {state,user, ...body} = req.body
 
 const productDB = await Product.findOne({name : body.name.toUpperCase()})

  if(productDB){ 
     return res.status(400).json({
         
         msg:`El Producto ${productDB.name} ya existe`
        })
  }

   // Generar data a guardar
   const data = {
    ...body,
    name : body.name.toUpperCase(),
    user : req.user._id,

   }


   const product = new Product(data);

   // guardar en DB

   await product.save();


   res.status(201).json(product);


}


// actualizar category 

const updateProduct = async(req, res) =>{


     const {id} = req.params 
     const {state,user,...data} = req.body

     if(data.name){
         
         data.name = data.name.toUpperCase()
     }
    
     data.user = req.user_id
        

     const product = await Product.findByIdAndUpdate(id,data,{new:true})


     res.json(product)


}



// delete category


const deleteProduct = async(req,res) => {

    const {id} = req.params;

   
   const productDelete = await Product.findByIdAndUpdate(id,{state:false},{new:true})

  res.json({
      productDelete
  })

}

export {
    getAllProducts,
    getOneProduct,
    updateProduct,
   createProduct,
   deleteProduct,
}