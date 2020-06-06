const express = require('express');
const morgan = require('morgan');
const cors = require('cors');;

const connect = require('./utils/db');
const config = require('./utils/config');

const ItemRoutes = require('./resources/item/item.router');
const ListRoutes = require('./resources/list/list.router');
const UserRoutes = require('./resources/user/user.router');
const { signup, signin, protect } = require('./utils/auth');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect);

app.use('/api/user', UserRoutes);
app.use('/api/item', ItemRoutes);
app.use('/api/list', ListRoutes)

// error handling for not valid routes
app.use((req, res, next) => {
     const error = new Error('Not found');
     error.status = 404;
     next(error);
 });
 
 app.use((error, req, res, next) => {
     res.status(error.status || 500).json({
         error: {
             message: error.message
         }
     });
 });

const start = async () => {
   try {
        console.log('Database Connecting.....');
        await connect();
        console.log('Database Connected');
        app.listen(config.PORT, () => {
        console.log(`REST API on http://localhost:${config.PORT}/api`)
        })
   } catch (error) {
        console.error(error);
   }
};

module.exports = {
    app,
    start
}