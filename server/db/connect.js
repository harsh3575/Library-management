import mongoose from "mongoose";


const Connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGOURL)
        console.log("Connection Successfully")
    } catch (error) {
        console.log(error)
    }
}



export default Connection


