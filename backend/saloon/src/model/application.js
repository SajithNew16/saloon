exports.IsAuthenticated = function (req, res, next) {
    if (req.IsAuthenticated()) {
        next();
    }
    else {
        next(new Error(401));
    }
}