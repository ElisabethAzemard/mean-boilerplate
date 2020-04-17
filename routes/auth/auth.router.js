/*
Imports
*/
    // Nodes
    const express = require('express');
    const myRouter = express.Router();

    // Modules
    const { checkFields } = require('../../services/request.checker');
    const MandatoryFields = require('../../services/mandatory.service').default;
    const { register, login, logout, getUserInfo } = require('./auth.controller');
//

/*
Routes definition
*/
    class MyRouterClass {
        // Inject Passport to secure routes
        constructor({ passport }) {
            this.passport = passport;
        }

        // Set route fonctions
        routes(){

            // POST 'api/auth/register': send data to register new user
            myRouter.post( '/register', (req, res) => {
                // Error: no body present
                if (typeof req.body === 'undefined' || req.body === null) {
                    return res.status(400).json({
                        message: 'No body provided',
                        data: null,
                        err: null
                    })
                }

                // Check fields in the body
                const { miss, extra, ok } = checkFields( MandatoryFields.register, req.body);

                if(!ok){
                    return res.status(400).json({
                        message: 'Bad fields provided',
                        data: null,
                        err: {miss, extra}
                    })
                }
                else{
                    register(req)
                    .then( apiResponse => {
                        return res.status(201).json({
                            message: 'Indentity created',
                            data: apiResponse,
                            err: null
                        })
                    })
                    .catch( apiResponse => {
                        return res.status(400).json({
                            message: 'Identity not created',
                            data: null,
                            err: apiResponse
                        })
                    })
                }
            });

            // POST 'api/auth/login': send data to log user
            myRouter.post( '/login', (req, res) => {
                // Error: no body present
                if (typeof req.body === 'undefined' || req.body === null) {
                    return res.status(400).json({
                        message: 'No body provided',
                        data: null,
                        err: null
                    })
                }

                // Check fields in the body
                const { miss, extra, ok } = checkFields( MandatoryFields.identity, req.body);

                if(!ok){
                    return res.status(400).json({
                        message: 'Bad fields provided',
                        data: null,
                        err: {miss, extra}
                    })
                }
                else{
                    login(req, res)
                    .then( apiResponse => {
                        return res.status(201).json({
                            message: 'Indentity found',
                            data: apiResponse,
                            err: null
                        })
                    })
                    .catch( apiResponse => {
                        return res.status(400).json({
                            message: 'Identity not found',
                            data: null,
                            err: apiResponse
                        })
                    })
                }
            });

            // GET 'api/auth/logout': send data to log user
            myRouter.get( '/logout', (req, res) => {
                logout(res)
                .then( apiResponse => {
                    return res.status(201).json({
                        message: 'Indentity found',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Identity not found',
                        data: null,
                        err: apiResponse
                    })
                })
            });

            // GET 'api/auth': check user token (for Angular AuthGuard)
            myRouter.get( '/', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                getUserInfo(req)
                .then( apiResponse => {
                    return res.status(200).json({
                        message: 'User data from token found',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'User data from token not found',
                        data: null,
                        err: apiResponse
                    })
                })
            });
        };

        // Start router
        init(){
            // Get route fonctions
            this.routes();

            // Sendback router
            return myRouter;
        };
    };
//

/*
Export
*/
    module.exports = MyRouterClass;
//
