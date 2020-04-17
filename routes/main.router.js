/* IMPORTS */

// node modules
const { Router } = require('express');
const passport = require('passport');

// routers
const FrontRouterClass = require('./front/front.router');
const PostRouterClass = require('./item/item.router');
const AuthRouterClass = require('./auth/auth.router')

// authentication
const { setAuthentication } = require('../services/auth.service');
setAuthentication(passport);

/* DEFINE ROUTERS */

// parent
const mainRouter = Router();
const apiRouter = Router();
mainRouter.use('/api', apiRouter);

// child
const frontRouter = new FrontRouterClass();
const postRouter = new PostRouterClass( { passport } );
const authRouter = new AuthRouterClass( { passport } );

/* CONFIGURE ROUTES */

// set API routers
apiRouter.use('/post', postRouter.init());
apiRouter.use('/auth', authRouter.init());

// set front router
mainRouter.use('/', frontRouter.init());


/* EXPORT */
module.exports = { mainRouter };
