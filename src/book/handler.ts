import mongoose from 'mongoose';
import { Book } from './book.schema';

let dbcache: any = null;
const connect = async (uri: string) => {
    if (!dbcache) dbcache = await mongoose.connect(uri);
};

export const getBooks = async (event: any, context: any, callback: any) => {
    try {
        await connect(process.env.MONGO_URL as string);
        const books = await Book.find({});
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: `Success`,
                data : books
            }),
        });
    
    } catch (err) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify(err),
        });
    }
}

export const getBookById = async (event: any, context: any, callback: any)=>{
    try {
        await connect(process.env.MONGO_URL as string);
        const {id} = event.pathParameters;
        const book = await Book.findById(id);
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: `Success`,
                data : book
            }),
        });
    } catch (error) {
        console.log(error)
        callback(null, {
            statusCode: 400,
            body: JSON.stringify(error),
        });
    }
}

export const createBook = async (event: any, context: any, callback: any)=>{
    try {
        await connect(process.env.MONGO_URL as string);
        const { author, name,category,price } = JSON.parse(event.body);
        const book = await Book.create({
            author,
            name,
            price,category
        })
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: `Success`,
                data : book
            }),
        });
    } catch (error) {
        console.log(error)
        callback(null, {
            statusCode: 400,
            body: JSON.stringify(error),
        });
    }
}

export const updateBookById = async (event: any, context: any, callback: any)=>{
    try {
        await connect(process.env.MONGO_URL as string);
        const {id} = event.pathParameters;
        const body = JSON.parse(event.body);
        const book = await Book.findOneAndUpdate(id,{...body},{new : true})
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: `Success`,
                data : book
            }),
        });
    } catch (error) {
        console.log(error)
        callback(null, {
            statusCode: 400,
            body: JSON.stringify(error),
        });
    }
}

export const deleteBookById = async (event: any, context: any, callback: any)=> {
    try {
        await connect(process.env.MONGO_URL as string);
        const {id} = event.pathParameters;
        const book = await Book.findByIdAndDelete(id)
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: `Success`,
            }),
        });
    } catch (error) {
        console.log(error)
        callback(null, {
            statusCode: 400,
            body: JSON.stringify(error),
        });
    }
}