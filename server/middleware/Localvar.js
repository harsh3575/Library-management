export const Localvarible = (req, res, next) => {
    req.app.locals = {
        otp: null,
        session: null
    }
    next()
}