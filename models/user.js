
import pkg from 'mongoose';
const { Schema, model } = pkg;




const UserSchema = Schema({
        
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
            default:"DEFAULT_IMG"
        },
        role: {
            type: String,
            required: true,
            default:"USER_ROLE",
            emun: ['ADMIN_ROLE','USER_ROLE']
        },
        state: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        },

});

UserSchema.methods.toJSON = function() {
    const {__v,password,_id, ...user} = this.toObject();
    
    user.uid = _id
     

    return user;
}



export const User = model('User',UserSchema);