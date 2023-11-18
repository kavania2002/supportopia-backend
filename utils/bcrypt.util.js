const bcrypt = require('bcrypt')

/**
 * Hash password with bcrypt
 * @param {string} password
 * @returns {string} hashedPassword
 */
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 8)
  return hashedPassword
}

/**
 * Compare DB hashed password with input password with bcrypt
 * @param {string} inputPassword
 * @param {string} hashedPassword
 * @returns {boolean} result
 */
const verifyPassword = async (inputPassword, hashedPassword) => {
  const result = await bcrypt.compare(inputPassword, hashedPassword)
  return result
}

module.exports = { hashPassword, verifyPassword }