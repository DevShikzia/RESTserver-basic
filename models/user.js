
import { Schema, model } from "mongoose";



const userSchema = Schema({
        
        name: {
            type: String,
            required: [true,'El name es obligatorio']
        },
        email: {
            type: String,
            required: [true,'El correo es obligatorio'],
            unique: true    
        },
        password: {
            type: String,
            required: [true,'La contraseña es obligatoria'],    
        },
        img: {
            type: String,
        },
        rol: {
            type: String,
            required: true,
            emun: ['ADMIN_ROLE','USER_ROLE']
        },
        estado: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        },

});

export const User = model('User',userSchema);