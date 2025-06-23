
export default function logger(req, res, next) {
    req.customLog = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
    next();
}
