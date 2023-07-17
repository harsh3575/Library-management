import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookCategory: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    bookContent: {
        type: String,
        required: true
    },
    bookImg: {
        type: String
    }
})


const BookModel = mongoose.model("BookModel", bookSchema)

export default BookModel