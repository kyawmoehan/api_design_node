const express = require('express');
const morgan = require('morgan');
const cors = require('cors');;

const connect = require('./utils/db');
const config = require('./utils/config');

const ItemRoutes = require('./resources/item/item.router');
const ListRoutes = require('./resources/list/list.router');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// items routes
app.use('/api/item', ItemRoutes);

// list routes
app.use('/api/list', ListRoutes)

const start = async () => {
   try {
        await connect();
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