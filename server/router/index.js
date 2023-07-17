import express from "express";
import { GeneratOtp, Login, Register, ResetPassword, VerifyOtp } from '../controller/index.js'
import { AddBook, DashbordLogin, GetBook, GetBookForUser, GetSingleData, SearchData, deletebook } from "../controller/Dashbord.js";
import { Auth, verifyUser } from "../middleware/Auth.js";
import uploadImage from "../middleware/Upload.js";
import { Localvarible } from "../middleware/Localvar.js";
import { MailerSender } from "../middleware/Mail.js";
const router = express.Router();

// User Api
router.post("/register", Register)
router.post("/login", Login)
router.post("/dashbord/login", DashbordLogin)
router.get("/dashbord/verify", Auth, (req, res) => { res.end() })
router.post("/dashbord/addBook", uploadImage.single('bookImg'), AddBook)
router.get("/dashbord/getbook", GetBook)
router.get("/getdata", GetBookForUser)
router.delete("/dashbord/deletebook", deletebook)
router.get("/dashbord/searchdata", SearchData)
router.get("/singledata/:_id", GetSingleData)
router.post("/generatotp", verifyUser, Localvarible, GeneratOtp)
router.get('/verifyotp/:otp', VerifyOtp)
router.post('/sendmail', MailerSender)
router.put('/resetpassword', ResetPassword)


export { router }