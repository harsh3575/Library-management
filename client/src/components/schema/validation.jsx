import * as Yup from "yup"




export const signupValid = Yup.object({
    name: Yup.string().min(3).required("Please Enter Your Name "),
    phone: Yup.number().min(10).required("Please Enter Your Mobile Number..."),
    email: Yup.string().email().required("Please Enter Your Email"),
    password: Yup.string().required("Please Enter Your Password")
})

export const loginValid = Yup.object({
    email: Yup.string().email().required("Please Enter Your Email"),
    password: Yup.string().required("Please Enter Your Password")
})