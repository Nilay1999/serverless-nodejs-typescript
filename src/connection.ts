const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected: any;
export const connectToDatabase = () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    console.log('=> using new database connection');
    return mongoose
        .connect('mongodb://localhost:27017/serverless')
        .then((db: any) => {
            isConnected = db.connections[0].readyState;
        });
};
