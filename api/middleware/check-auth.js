const jwt = require('jsonwebtoken');

module.exports =  (req, res, next)=>
{
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token, 'This is the key')
        next(); 

    }
    catch(error)
    {
        return res.status(401).json({
            msg:"unauthorized user"
        })
    }
}