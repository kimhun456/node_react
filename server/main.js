
// import modules
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';

// import Routers
import api from './routes';

// database connection
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to mongoDB server');
});
mongoose.connect('mongodb://localhost/codelab');

const devPort = 4000;
const app = express();
const port = 3000;


 // adapt Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
    secret : 'Codelab1$1$234',
    resave : false,
    saveUninitialized : true
}));

// handle error 
app.use((err,req,res,next) =>{
    console.error(err.stack);
    res.status(500).send('Something Broke!!');
});

//router setting
app.use('/', express.static(path.join(__dirname, './../public')));
app.use('/api', api);


app.listen(port, () => {
    console.log('Express is listening on port', port);
});


if(process.env.NODE_ENV === 'development'){
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);

    devServer.listen(
        devPort,
        () => {
            console.log('WebpackDevServer is listening on port', devPort);
        }
    );

}