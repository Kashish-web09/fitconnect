import { validationResult } from "express-validator";

export const validator=(view)=>{
    return async (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render(view,{
                errors:errors.mapped()
            })
        }
    next();
    }
}