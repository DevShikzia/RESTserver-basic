import { request, response } from "express";
import pkg from "mongoose";
const { isValidObjectId } = pkg;
import { Category, Product, User } from "../models/index.js";

const allowedCollections = ["user", "category", "products", "roles,"];

const searchUsers = async (section = "", res = response) => {
  const isMongoID = isValidObjectId(section);

  if (isMongoID) {
    const user = await User.findById(section);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(section, 'i' );

  const user = await User.find({
    $or: [{ name: regex }, {email: regex}],
    $and: [{ state: true}]
  });

  res.json({
    results: user 
  });
};

const searchCategory = async(section = "", res = response) => {
    const isMongoID = isValidObjectId(section)
    if (isMongoID) {
        const category = await Category.findById(section);
        return res.json({
          results: category ? [category] : [],
        });
      }

      const regex = new RegExp(section, 'i' );

  const category = await Category.find({ name: regex,state:true});

  res.json({
    results: category 
  });
          
}


const searchProduct = async (section = "", res = response) => {
    const isMongoID = isValidObjectId(section);
  
    if (isMongoID) {
      const product = await Product.findById(section)
                                   .populate("category","name");;
      return res.json({
        results: product ? [product] : [],
      });
    }
  
    const regex = new RegExp(section, 'i' );
  
    const product = await Product.find({name: regex, state:true})
    .populate("category","name");
  
    res.json({
      results: product 
    });
  };



const search = (req, res) => {
  const { collection, section } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `las colecciones permitidas son: ${allowedCollections}`,
    });
  }


  switch (collection) {
    case "user":
      searchUsers(section, res);
      break;
    case "category":
     searchCategory(section, res)
      break;
    case "products":
        searchProduct(section, res)
      break;

    default:
      res.status(500).json({
        msg: `se le olvido hacer esta busqueda`,
      });
  }
};

export { search };
