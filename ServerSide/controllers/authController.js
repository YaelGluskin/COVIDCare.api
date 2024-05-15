// Importing necessary modules
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) { // Check if username and password are provided
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ username }).exec()
    if (!foundUser || !foundUser.activestatus) { // Check if user is found and active
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password) // Compare passwords
    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        }, // Payload
        process.env.ACCESS_TOKEN_SECRET, // Secret key
        { expiresIn: '15m' } // Token expiration time
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' } // Users will have to re-enter the secure system every day
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, // Accessible only by web server 
        secure: true, // HTTPS
        sameSite: 'None', // Cross-site cookie 
        maxAge: 1 * 24 * 60 * 60 * 1000 // Cookie expiry: set to match refreshToken
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies // The cookie
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
    
    const refreshToken = cookies.jwt

    jwt.verify( // 
    refreshToken, // Pass in the refresh token varible
    process.env.REFRESH_TOKEN_SECRET, // Verify refreshToken and decode it
    asyncHandler(async (err, decoded) => { // Asynchronously handle verification
        if (err) return res.status(403).json({ message: 'Forbidden' }) // If verification fails, return Forbidden
        const foundUser = await User.findOne({ username: decoded.username }).exec() // Find user based on decoded username
        if (!foundUser) return res.status(401).json({ message: 'Unauthorized' }) // If user not found, return Unauthorized
        const accessToken = jwt.sign( // Generate new accessToken
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": foundUser.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )
        res.json({ accessToken }) // Send the new accessToken
    })

    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies // Get cookies from request
    if (!cookies?.jwt) return res.sendStatus(204) // If no JWT cookie, return successful but no content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }) // Clear JWT cookie, 
    // pass the same options that has been done when the cookie created
    res.json({ message: 'Cookie cleared' })
    
}

module.exports = {
    login, // Export login function
    refresh, // Export refresh function
    logout // Export logout function
}
