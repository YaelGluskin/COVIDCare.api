const jwt = require('jsonwebtoken')


const verifyJWT = (req, res, next) => { // Define middleware function to verify JWT
    const authHeader = req.headers.authorization || req.headers.Authorization // Get Authorization header

    if (!authHeader?.startsWith('Bearer ')) { // Check if token starts with 'Bearer'
        return res.status(401).json({ message: 'Unauthorized' }) // If not, return Unauthorized
    }

    const token = authHeader.split(' ')[1] // Extract token from header
    // Verify token: Token to verify, Access token secret
    jwt.verify( 
        token,
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => { // Callback function to handle verification result
            if (err) return res.status(403).json({ message: 'Forbidden' }) // If verification fails, return Forbidden
            req.user = decoded.UserInfo.username // Extract username from decoded token and attach it to request object
            req.roles = decoded.UserInfo.roles // Extract roles from decoded token and attach it to request object
            next() // Call next middleware
        }
    )
}

module.exports=  verifyJWT