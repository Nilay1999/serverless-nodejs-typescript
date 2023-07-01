import { DynamoDB } from 'aws-sdk';
 
const connect = new DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8001'
})
    
export const createBook = async (event: any, context: any, callback: any)=>{
    try {
        
    } catch (error) {
        console.log(error)
        callback(null, {
            statusCode: 400,
            body: JSON.stringify(error),
        });
    }
}