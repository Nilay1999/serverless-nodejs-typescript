import mongoose from 'mongoose';

interface IBook {
    name:string;
    author:string;
    price:number;
    category:string
}

const bookSchema = new mongoose.Schema<IBook>(
    {
        name:{
            type:String
        },
        author: {
            type: String,
        },
        price:{
            type:Number
        },
        category:{
            type : String
        }
    },
    { timestamps: true }
)
export const Book = mongoose.model('Book',bookSchema)