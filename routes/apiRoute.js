/**
 * @swagger
 * tags:
 *  name: api/v1/
 *  description: api/v1/
 */
const express = require('express');
const { registerCustomer } = require('../controllers/apiController');
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
 *              $ref: '#/components/schemas/RegisterCustomerRequest'
 *          example:
 *              id: bobid
 *              name: bob
 *              email: bob@gmail.com
 *              password: secret
 *    responses:
 *     '200':
 *       description: ''
 *       headers: {}
 */
router.post('/customer/register', registerCustomer);

module.exports = router;
