import jwt from 'jsonwebtoken'
import BookModel from '../model/BooksSchema.js'
import fs from 'fs'



export const DashbordLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!(username && password))
            throw ("Field must be required")
        if (username === "admin106" && password === "admin@123") {
            const token = jwt.sign({ id: username }, process.env.SKEY)
            return res.status(201).send({ token })
        }
        else
            throw ("Invalid value !")
    } catch (err) {
        console.log(err);
        return res.status(404).json(err)
    }
}

export const AddBook = async (req, res) => {
    try {
        const data = req.body
        let { bookName, bookCategory, bookTitle, bookContent, bookAuthor } = data
        if (!(bookName && bookCategory && bookTitle && bookContent && bookAuthor))
            throw ("Value must be Filed")
        data.bookImg = req.file.path
        const result = new BookModel({ ...data })
        await result.save()
        return res.status(201).send({ meassage: "Data Saved" })

    } catch (err) {
        console.log(err);
        return res.status(401).send(err)
    }
}


export const GetBook = async (req, res) => {
    try {
        const result = {}
        let { id } = req.query
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        let data = null
        if (id) {
            data = await BookModel.find({ _id: id })
        } else {
            data = await BookModel.find({})
        }
        result.totalUsers = data.length
        result.pagecount = Math.ceil(data.length / limit)

        let startIndex = (page - 1) * limit
        let endIndex = (page) * limit
        if (endIndex < data.length) {
            result.next = {
                page: page + 1
            }
        }
        if (startIndex > 0) {
            result.prev = {
                page: page + 1
            }
        }

        result.results = data.slice(startIndex, endIndex)
        return res.status(201).send(result)
    }
    catch (er) {
        console.log(er);
        return res.status(401).send(er)
    }
}


export const GetBookForUser = async (req, res) => {
    try {

        const data = await BookModel.find({})
        return res.status(201).send(data)
    } catch (err) {
        console.log(err);
        return res.status(401).send(err)
    }
}


export const deletebook = async (req, res) => {
    try {
        const data = req.body
        const FindAccount = await BookModel.find({ _id: { $in: data } })
        FindAccount.map(({ bookImg }) => {
            fs.unlink(bookImg, (err) => {
                if (err) {
                    throw ("Can't Delete")
                }
                console.log("File Delete SuccessFully...");
            })

        })
        const result = await BookModel.deleteMany({ _id: { $in: data } })
        return res.status(201).send({ result })
    } catch (err) {
        console.log(err);
        return res.status(501).send(err)
    }
}

export const SearchData = async (req, res) => {
    try {
        const { query } = req.query
        let data = await BookModel.find({ bookName: { $regex: query } })
        return res.status(201).send(data)
    } catch (er) {
        console.log(er);
        return res.status(401).send(er)
    }
}

export const GetSingleData = async (req, res) => {
    try {
        const { _id } = req.params
        const data = await BookModel.findById({ _id })
        return res.status(201).send(data)
    } catch (err) {
        console.log(err)
        return res.status(401).send(err)
    }
}