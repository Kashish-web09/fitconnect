import jwt from 'jsonwebtoken';

export const jwtToken=(req,res,next)=>{
  
    const token=req.cookies.customerToken;
    if(!token){
                        return res.status(401).send("unauthorized")
    }
    try {
        const payload=jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );
        req.userId=payload.userId;
        next();
    } catch (err) {
                return res.status(401).send("unauthorized")

    }
}