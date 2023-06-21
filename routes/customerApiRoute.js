const express = require('express');
const { registerCustomer, withdrawalCustomer, editCustomer, loginCustomer, checkCustomer, saveCart, findCustomer, getList, getCustomerInfo } = require('../controllers/customerApiController');
const authenticateUser = require('../middleware/authenticationUser');
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
 *              num: 40 //auto increment
 *              name: bob
 *              email: bob@gmail.com
 *              password: secret
 *              phonenumber: 01012341234
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
 *  /customer/withdrawal:
 *   post:
 *    tags: [Customer]
 *    summary: (o) Withdrawal Customer
 *    operationId: withdrawalCustomer
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *    responses:
 *     '200':
 *       description: 'Successfully delete customer'
 *       headers: {}
 *     '400':
 *       description: 'Error to delete customer'
 *       headers: {}
 */
router.post('/withdrawal', authenticateUser, withdrawalCustomer);

/**
 * @swagger
 * paths:
 *  /customer/edit:
 *   post:
 *    tags: [Customer]
 *    summary: Edit Customer
 *    operationId: editCustomer
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              num: 40 //auto increment
 *              name: bob
 *              email: bob@gmail.com
 *              password: secret
 *              phonenumber: 01012341234
 *    responses:
 *     '200':
 *       description: 'Successfully updated edit customer'
 *       headers: {}
 *     '400':
 *       description: 'Error to updated edit customer'
 *       headers: {}
 */
router.post('/edit', editCustomer);

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
 *              email: test@test.com
 *              password: xptmxm1123
 *    responses:
 *     '200':
 *       description: 'Successfully login and provide token'
 *       headers: {}
 *     '400':
 *       description: 'Error to login'
 *       headers: {}
 */
router.post('/login', loginCustomer);

/**
 * @swagger
 * paths:
 *  /customer/check:
 *   post:
 *    tags: [Customer]
 *    summary: Customer pw check
 *    operationId: CheckCustomer
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              email: test@test.com
 *              password: xptmxm1123
 *    responses:
 *     '200':
 *       description: 'Successfully Check email/pw'
 *       headers: {}
 *     '400':
 *       description: 'Error to check email/pw'
 *       headers: {}
 */
router.post('/check', checkCustomer);
/**
 * @swagger
 * paths:
 *  /customer/findEmail:
 *   post:
 *    tags: [Customer]
 *    summary: Customer find Email
 *    operationId: FindCustomer
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              name: bob
 *    responses:
 *     '200':
 *       description: 'Successfully find customer email'
 *       headers: {}
 *     '400':
 *       description: 'Error to login'
 *       headers: {}
 */
router.post('/findEmail', findCustomer);

/**
 * @swagger
 * paths:
 *  /customer/saveCart:
 *   post:
 *    tags: [Customer]
 *    summary: Customer cart save
 *    operationId: SaveCart
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              email: bob@gmail.com
 *              cart: [14,15]
 *    responses:
 *     '200':
 *       description: 'Successfully update cart'
 *       headers: {}
 *     '400':
 *       description: 'Error to  update cart'
 *       headers: {}
 */
router.post('/savecart', saveCart);

/**
 * @swagger
 * paths:
 *  /customer/getlist:
 *   get:
 *    tags: [Customer]
 *    summary: Customer get list
 *    operationId: get Customer list
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              name: bob
 *    responses:
 *     '200':
 *       description: 'Successfully find customer get list'
 *       headers: {}
 *     '400':
 *       description: 'Error to get list'
 *       headers: {}
 */
router.get('/getlist', getList);

/**
 * @swagger
 * paths:
 *  /customer/getcustomer:
 *   get:
 *    tags: [Customer]
 *    summary: (o) Customer get info
 *    operationId: getCustomerInfo
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *    responses:
 *     '200':
 *       description: 'Successfully find customer'
 *       headers: {}
 *     '400':
 *       description: 'Error to get customer'
 *       headers: {}
 */
router.get('/getcustomer', authenticateUser, getCustomerInfo);

module.exports = router;
