// Example Logger Middleware (Assuming you built this in Pre-Test Setup)
export default function logger(req, res, next) {
    // You can't use console.log as per requirement.
    // Implement your own file or DB based logging here if required.
    // For demo:
    req.customLog = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
    // Example: Save to file, external service, or just attach to request.
    next();
}
