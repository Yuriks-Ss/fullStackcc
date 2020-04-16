//npm start server

const express = require('express');
const app =express();
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path')

const authRouter = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log('mongodb connected'))
    .catch(error => console.log(error))
mongoose.set('useCreateIndex', true);//delete not crash

app.use(passport.initialize())
app.use('/uploads', express.static('uploads'))
require('./middlewere/passport')(passport)


app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors('cors'));

app.use('/api/auth',authRouter);
app.use('/api/analytics',analyticsRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/position',positionRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })

}




module.exports = app;

