const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

/**
 * Generate JWT token from payload provided
 * @param {string} payload
 * @returns {string} token
 */
const generateJWT = async (payload) => {
  // sign the jwt token with user_id returned from db
  // which expiresIn in 30 days
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' })
  return token
}

/**
 * Verify provided JWT token
 * @param {string} token
 * @returns {boolean}
 */
const verifyToken = async (token) => {
  // verify token (whether expired/incorrect)
  const verificationResult = jwt.verify(token, JWT_SECRET)
  return verificationResult
}

module.exports = { generateJWT, verifyToken }
