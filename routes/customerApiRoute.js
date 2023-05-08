const express = require('express');
const { registerCustomer, loginCustomer } = require('../controllers/apiController');
const router = express.Router();

/**
 * @swagger
 * paths:
 *  /customer/register:
 *   post:
 *    tags: [Customer]
 *    summary: Register Customer
 *    operationId: RegisterCustomer
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              id: bobid
 *              name: bob
 *              email: bob@gmail.com
 *              password: secret
 *    responses:
 *     '200':
 *       description: 'Successfully updated'
 *       headers: {}
 *     '400':
 *       description: 'Error to updated'
 *       headers: {}
 */
router.post('/register', registerCustomer);

/**
 * @swagger
 * paths:
 *  /customer/login:
 *   post:
 *    tags: [Customer]
 *    summary: Customer Login
 *    operationId: LoginCustomer
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              email: bob@gmail.com
 *              password: secret
 *    responses:
 *     '200':
 *       description: 'Successfully login and provide token'
 *       headers: {}
 *     '400':
 *       description: 'Error to login'
 *       headers: {}
 */
router.post('/login', loginCustomer);

module.exports = router;
