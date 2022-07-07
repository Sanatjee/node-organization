module.exports = async (req, res, next) => {
    if (Object.keys(req.body).length !== 0) {
        next();
    } else {
        await res.status(400).json({
            status: 400,
            message: "Invalid request.",
            errors: null,
        });
    }

}