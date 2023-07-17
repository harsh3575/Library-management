import UserModel from "../model/UserSchema.js"
import bcrypt from "bcrypt"
import otpgen from "otp-generator"

export const Register = async (req, res) => {
    try {
        const data = req.body
        const result = new UserModel({ ...data })
        const b = await result.save()
        return res.status(201).send(b)
    } catch (err) {
        console.log(err)
        return res.status(404).send(err)
    }
}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!(email && password))
            return res.status(401).send({ message: "Filled must be required" })
        const Result = await UserModel.findOne({ email })
        let isMatch = await bcrypt.compare(password, Result.password)
        if (!isMatch)
            return res.status(404).json({ message: "Invalid Value" })
        return res.status(201).send({ message: "Login SuccessFully" })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Invalid Value" })
    }
}


export const GeneratOtp = async (req, res) => {
    try {
        req.app.locals.otp = otpgen.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        return res.status(201).send({ code: req.app.locals.otp, data: req.detail })
    } catch (err) {
        console.log(err);
        return res.status(401).send(err)
    }
}

export const VerifyOtp = (req, res) => {
    const { otp } = req.params
    if (req.app.locals.otp == parseInt(otp)) {
        req.app.locals.session = true
        return res.status(201).send({ message: "Verify Successfully " })
    }
    return res.status(401).send({ message: "Wrong OTP" })
}

export const ResetPassword = async (req, res) => {
    try {
        if (req.app.locals.session) {
            const { password, email } = req.body
            let pwd = await bcrypt.hash(password, 12)
            const data = await UserModel.findOneAndUpdate({ email }, { password: pwd })
            console.log(data);
            req.app.locals.session = null
            return res.status(201).send({ message: "Password has been changed" })
        }
        else {
            throw ("Session is expire")
        }
    } catch (err) {
        console.log(err);
        return res.status(401).send(err)
    }
}