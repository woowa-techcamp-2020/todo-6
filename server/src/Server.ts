import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';
import logger from '@shared/Logger';
import CardDao, { ICardDao } from '@daos/Card/CardDao';
import UserDao, { IUserDao } from '@daos/User/UserDao';
import { IUser } from '@type';
import BaseRouter from './routes';

const flash = require('connect-flash');
const bodyParser = require('body-parser');

// Init express
const app = express();
const session = require('express-session');




/** **********************************************************************************
 *                              Set basic express settings
 ********************************************************************************** */

// set scripts static file
const scriptRequestUrl = '/public';
app.use(scriptRequestUrl, express.static(`${__dirname}${scriptRequestUrl}`));
app.use(flash());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}


/** **********************************************************************************
 *                              Set passport
 ********************************************************************************** */
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDao:IUserDao = new UserDao();

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false })); // 세션 활성화

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: IUser, done: any) => {
    done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
    userDao.getUser(id).then((res: any []) => {
        const user = res[0] as IUser;
        done(null, user);
    });
});


passport.use(new LocalStrategy(
    ((username:any, password:any, done: any) => {
        userDao.getUser(username).then((res: any []) => {
            const user = res[0] as IUser;
            if(user) {
                console.log(1);
                if(password === user.password) {
                    console.log(2);
                    return done(null, user);
                }
                console.log(3);
                return done(null, false, {
                    message: 'Incorrect password.',
                });
            }
            console.log(4);
            return done(null, false, {
                message: 'Incorrect username.',
            });
        });
    }),
));

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }));









// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});



/** **********************************************************************************
 *                              Serve front-end content
 ********************************************************************************** */
const isAuthenticated = (req:any, res: Response, next: NextFunction) => {
    if (req.user) return next();
    res.redirect('/login');
};
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('/login', (req: Request, res: Response) => {
    res.sendFile('login.html', { root: viewsDir });
});
app.get('/', isAuthenticated, (req: Request, res: Response) => {
    res.sendFile('index.html', { root: viewsDir });
});

// Export express instance
export default app;
