if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect(process.env.DATABASE_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
};

module.exports = connect;