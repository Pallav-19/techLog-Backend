let localToken;
let getLocalstorage = (req,res,next)=>{
    localToken = req.body.localToken;
    console.log("local token fetched "+localToken)
    next();
}
module.exports ={
    localToken,
    getLocalstorage
}