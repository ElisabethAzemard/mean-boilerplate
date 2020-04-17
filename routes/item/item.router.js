/* IMPORTS */

// node modules
const express = require('express');
const myRouter = express.Router();

// services
const { checkFields } = require('../../services/request.checker');
const MandatoryFields = require('../../services/mandatory.service').default;
const { createItem, readItem, readOneItem, updateItem, deleteItem } = require('./item.controller');

/* ROUTES DEFINITION */
class MyRouterClass {

    // inject passport in the class
    constructor( { passport } ){ this.passport = passport }

    routes(){
        // CRUD: create
        myRouter.post('/', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            // ERROR: no body provided
            if (typeof req.body === 'undefined' || req.body === null) {
                return res.status(400).json({
                    message: 'No body provided',
                    data: null,
                    err: null
                })
            }

            // check fields in the body
            const { miss, extra, ok } = checkFields( MandatoryFields.post, req.body);

            if(!ok){
                return res.status(400).json({
                    message: 'Incorrect fields provided',
                    data: null,
                    err: {miss, extra}
                })
            }
            else{
                createItem(req)
                .then( apiResponse => {
                    return res.status(201).json({
                        message: 'Data created',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Data not created',
                        data: null,
                        err: apiResponse
                    })
                })
            }
        })

        // CRUD: read
        myRouter.get('/', (req, res) => {
            readItem()
            .then( apiResponse => {
                return res.status(200).json({
                    message: 'Data sent',
                    data: apiResponse,
                    err: null
                })
            })
            .catch( apiResponse => {
                return res.status(400).json({
                    message: 'Data not sent',
                    data: null,
                    err: apiResponse
                })
            })
        })

        // CRUD: read one
        myRouter.get('/:id', (req, res) => {
            readOneItem(req)
            .then( apiResponse => {
                return res.status(200).json({
                    message: 'Data sent',
                    data: apiResponse,
                    err: null
                })
            })
            .catch( apiResponse => {
                return res.status(400).json({
                    message: 'Data not sent',
                    data: null,
                    err: apiResponse
                })
            })
        })

        // CRUD: update
        myRouter.put('/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            // ERROR: no body provided
            if (typeof req.body === 'undefined' || req.body === null) {
                return res.status(400).json({
                    message: 'No body provided',
                    data: null,
                    err: null
                })
            }

            // Check fields in the body
            const { miss, extra, ok } = checkFields( MandatoryFields.post, req.body);

            if(!ok){
                return res.status(400).json({
                    message: 'Incorrect fields provided',
                    data: null,
                    err: {miss, extra}
                })
            }
            else{
                updateItem(req)
                .then( apiResponse => {
                    return res.status(201).json({
                        message: 'Data updated',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Data not updated',
                        data: null,
                        err: apiResponse
                    })
                })
            }
        })

        // CRUD: delete
        myRouter.delete('/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            deleteItem(req)
            .then( apiResponse => {
                return res.status(200).json({
                    message: 'Data deleted',
                    data: apiResponse,
                    err: null
                })
            })
            .catch( apiResponse => {
                return res.status(400).json({
                    message: 'Data not deleted',
                    data: null,
                    err: apiResponse
                })
            })
        })
    }

    init(){
        // get routes functions
        this.routes();

        // return router
        return myRouter;
    }
}

/* EXPORT */
module.exports = MyRouterClass;
