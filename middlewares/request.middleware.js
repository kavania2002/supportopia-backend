const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.ip} ${req.method} ${req.originalUrl}`)
    next()
}
module.exports = logRequest;
