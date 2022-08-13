import pkg from 'mongoose';
const { Schema, model } = pkg;

  const CategorySchema = Schema({

        name: {
            type: String,
            required: [true,'El name es obligatorio'],
            unique: true,
        },
        state: {
            type:Boolean,
            default: true,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required:true
        } 
  });


  export const Category = model('Category',CategorySchema)