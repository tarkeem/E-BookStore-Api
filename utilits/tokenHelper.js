var jwt = require('jsonwebtoken');
var env=require('dotenv')
env.config()

exports.generateToken = (pname,pemail)=>{
    var token = jwt.sign({
       name:pname,
       email:pemail
    } , process.env.secret , {expiresIn :"3d"})
    return token;
}

exports.verifyToken = async (req, res, next) => {
        try {
            const {token} = req.headers;
            console.log("token : " + token)
            if(!token){
                console.log("No token exist");
                return res.status(500).send({error : 'Token is not exist'})
            }
            var decode = jwt.verify(token ,process.env.secret);
            console.log("decode:"  + JSON.stringify(decode))
            req.user = {
                name:decode.name,
                email:decode.email
            }
            next();
        } catch (error) {
            next(error);
        }
            
    }