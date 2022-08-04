import { request, response } from "express";

 const isAdminRole = (req=request,res=response,next) => {

   if (!req.user) {

     return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar token primero'
     })

   }

    const {role, name} = req.user
    
    if(role !== 'ADMIN_ROLE'){
     return res.status(401).json({

        msg:`${name} no es administrador - no puede hacer eso`
     })

    }

    
    
    next()
    
}


const hasRole = (...roles) => {


    return (req=request,res=response,next) => {

        if (!req.user) {

            return res.status(500).json({
               msg: 'Se quiere verificar el role sin validar token primero'
            })
       
          }

          if(!roles.includes(req.user.role)){

            return res.status(401).json({
                 msg: `el servicio requiere uno de estos roles ${roles} `
            })

          }

        next();
    }


}


export {
  isAdminRole,
  hasRole,

}