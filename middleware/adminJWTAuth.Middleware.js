import jwt from 'jsonwebtoken';

export const jwtToken=(req,res,next)=>{
const token=req.cookies.admintoken;
if(!token){
    return res.status(401).send("Unauthorized")
}
try {
    const payload=jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
    );
    req.adminId=payload.adminId;
    next();
} catch (err) {
                    return res.status(401).send("unauthorized")

}
}