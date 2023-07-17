import jwt from 'jsonwebtoken'
import UserModel from '../model/UserSchema.js';
export const Auth = (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const isVerify = jwt.verify(token, process.env.SKEY, function (err, data) {
            if (err)
                throw ("Token is not verify");
            else {
                console.log(data);
                return res.status(201).send({ data })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const verifyUser = async (req, res, next) => {
    try {
        const { email } = req.body
        let CheackUser = await UserModel.findOne({ email })
        if (!CheackUser) {
            return res.status(401).send({ message: "Email Not Found" })
        }
        req.detail = {
            name: CheackUser.name,
            email: CheackUser.email
        }
        next()
    } catch (err) {
        console.log(err);
        return res.status(401).send(err)
    }
}