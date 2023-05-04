const express = require('express');
const { registerCustomer, loginCustomer, getNoticeList } = require('../controllers/apiController');
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
router.post('/customer/register', registerCustomer);

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
router.post('/customer/login', loginCustomer);

/**
 * @swagger
 * paths:
 *  /notice/list/{id}:
 *   get:
 *    tags: [Notice]
 *    summary: Notice List
 *    operationId: NoticeList
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: number
 *         required: true
 *         description: The page ID
 *    responses:
 *     '200':
 *       description: 'Successfully get notice list'
 *       headers: {}
 *     '400':
 *       description: 'Error to get notice list'
 *       headers: {}
 */
router.get('/notice/list/:id', getNoticeList);

module.exports = router;
