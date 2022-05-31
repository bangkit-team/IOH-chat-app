const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.header('token');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user  = verified;
        if(req.user._id === req.headers._id){
            next();
        }else{
            res.status(401).send('Access Denied');
        }
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}