import {request, response } from "express";
import {Category, User} from "../models/index.js"


// Obtener Categories - paginado - total - populate

const GetAllCategory = async(req = request,res = response) => {
    
    const {limit = 5, skip = 0} = req.query;
    const query = {state:true}

    const [total,categories] = await Promise.all([
                                 Category.countDocuments(query),
                                 Category.find(query)
                                      .limit(limit)
                                      .skip(skip)
                                      .populate('user')
             
])



    res.json({
        total,
        categories,
    })

}

// Obtener Category - populate {}

const GetOneCategory =  async(req,res) => {

    const {id} = req.params;

    const category = await Category.findById({ _id : id }).populate('user')
  
     if (!category) {
        res.send(400).json(
            'No se encuentra esa categoria'
        )
     }


    res.json({
        category
    })


}




const createCategory = async(req = request, res = response ) =>{
    

 const name  = req.body.name.toUpperCase()



 const categoryDB = await Category.findOne({name})

   if(categoryDB){

    return res.status(400).json({

          msg:`La categoria ${categoryDB.name} ya existe`
    })
   }

   // Generar data a guardar
   const data = {
    name,
    user : req.user._id

   }


   const category = new Category(data);

   // guardar en DB

   await category.save();


   res.status(201).json(category);


}


// actualizar category 





// delete category


const deleteCategory = async(req,res) => {

    const {id} = req.params;

   
   const category = await Category.findByIdAndUpdate(id,{state:false},{new:true})

  res.json({
      category
  })

}

export {
    GetAllCategory,
    GetOneCategory,
    createCategory,
    deleteCategory,
}