const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            res.status(403).json({
                status: 403,
                message: "Access Denied",
                errors: null,
            });
        }

        const decodedUser = jwt.verify(token, process.env.tokenKey);
        req.userInfo = decodedUser;

        if (Date.now() >= decodedUser.exp * 1000) {
            res.status(400).json({
                status: 400,
                message: "Invalid token",
                errors: null,
            });
        }

        next();
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: "Invalid token",
            errors: null,
        });
    }
}