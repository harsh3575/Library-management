import nodemailer from 'nodemailer'
import MailGen from 'mailgen'

export const MailerSender = (req, res) => {
    const { name, email, intro, outro } = req.body
    res.end()
    console.log(process.env.EMAIL);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    let MailGenetor = new MailGen({
        theme: "default",
        product: {
            name: "Library Managment",
            link: "https://mailgen.js/"
        }
    })
    const mail = {
        body: {
            name: name,
            intro: intro,
            outro: outro
        }
    }
    let emailBody = MailGenetor.generate(mail)
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Forgot Password ",
        html: emailBody
    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
            return res.status(404).send({ error: "Email is Not Exist" })
        }
        else {

            return res.status(201).send({ message: "Code Send On Your Email" })

        }
    })
}