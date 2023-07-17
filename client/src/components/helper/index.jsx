import axios from "axios";


export const RegisterApi = async (obj) => {
    try {
        const { status, data } = await axios.post("/api/register", { ...obj })
        return Promise.resolve()
    } catch (error) {
        console.log(error);
        return Promise.reject()
    }
}

export const LoginApi = async (obj) => {
    try {
        const { status, data } = await axios.post("/api/login", { ...obj })
        return Promise.resolve(data.message)
    } catch (err) {
        console.log(err);
        return Promise.reject()
    }
}

export const AddBook = async (obj) => {
    try {
        const { status, data } = await axios.post('/api/dashbord/addBook', obj)
        console.log(data);
        return Promise.resolve(data.message)
    } catch (err) {
        console.log(err);
        return Promise.reject()
    }
}