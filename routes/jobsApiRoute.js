const express = require('express');
const {
  getNoticeList,
  getMainCourse,
  getMainCourseInfor,
  getAccessMainCourse,
  getProgress,
  getSubCourse,
  getSubCourseDetail,
  getSubCourseSampleDetail,
  updateCustomerToSubCourse,
  createOrder,
  getContinueSubCourse,
  getConfig,
} = require('../controllers/jobsApiController');
const authenticateUser = require('../middleware/authenticationUser');
const router = express.Router();
/**
 * @swagger
 * paths:
 *  /jobs/notice/list/{id}:
 *   get:
 *    tags: [Jobs]
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

/**
 * @swagger
 * paths:
 *  /jobs/maincourse/list:
 *   get:
 *    tags: [Jobs]
 *    summary: Get Main Course List
 *    operationId: McourseList
 *    responses:
 *     '200':
 *       description: 'Successfully get main course list'
 *       headers: {}
 *     '400':
 *       description: 'Error to get main course list'
 *       headers: {}
 */
router.get('/maincourse/list', getMainCourse);

/**
 * @swagger
 * paths:
 *  /jobs/maincourse/info/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *      type: string
 *      required: true
 *      description: The mainCourse information by main course ID
 *   get:
 *    tags: [Jobs]
 *    summary: Get Main Course information
 *    operationId: MinfoData
 *    responses:
 *     '200':
 *       description: 'Successfully get main course information,  if main course does not have information return empty information'
 *       headers: {}
 *     '400':
 *       description: 'Error to get main course information'
 *       headers: {}
 */
router.get('/maincourse/info/:id', getMainCourseInfor);

/**
 * @swagger
 * paths:
 *  /jobs/maincourse/access/list:
 *   get:
 *    tags: [Jobs]
 *    summary: (o) Get Access Main Course id list
 *    operationId: AccessMcourseList
 *    responses:
 *     '200':
 *       description: 'Successfully get access main course id list'
 *       headers: {}
 *     '400':
 *       description: 'Error to get access main course list'
 *       headers: {}
 */
router.get('/maincourse/access/list', authenticateUser, getAccessMainCourse);

/**
 * @swagger
 * paths:
 *  /jobs/maincourse/getprogress/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *      type: string
 *      required: true
 *      description: MainCourse Id
 *   get:
 *    tags: [Jobs]
 *    summary: (o) Get Maincourse progress rate by customer
 *    operationId: Getprogress
 *    responses:
 *     '200':
 *       description: 'Successfully get progress rate by customer'
 *       headers: {}
 *     '400':
 *       description: 'Error to get progress rate by customer'
 *       headers: {}
 */
router.get('/maincourse/getprogress/:id', authenticateUser, getProgress);

/**
 * @swagger
 * paths:
 *  /jobs/subcourse/list/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *      type: string
 *      required: true
 *      description: The subcourse list by main course ID
 *   get:
 *    tags: [Jobs]
 *    summary: Get Subcourse List
 *    operationId: SubcourseList
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: number
 *         required: true
 *         description: The MainCourse Id
 *    responses:
 *     '200':
 *       description: 'Successfully get notice list'
 *       headers: {}
 *     '400':
 *       description: 'Error to get notice list'
 *       headers: {}
 */
router.get('/subcourse/list/:id', getSubCourse);

/**
 * @swagger
 * paths:
 *  /jobs/subcourse/continue/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *      type: string
 *      required: true
 *      description: The Continue for subcourse feature
 *   get:
 *    tags: [Jobs]
 *    summary: (o) Get Continue for subcourse
 *    operationId: ContinueSubCourse
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: number
 *         required: true
 *         description: The MainCourse Id
 *    responses:
 *     '200':
 *       description: 'Successfully get Continue subcourse id'
 *       headers: {}
 *     '400':
 *       description: 'Error to get Continue subcourse id'
 *       headers: {}
 */
router.get('/subcourse/continue/:id', authenticateUser, getContinueSubCourse);

/**
 * @swagger
 * paths:
 *  /jobs/subcourse/detail/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *      type: string
 *      required: true
 *      description: The subcourse detail by subcourse id
 *   get:
 *    tags: [Jobs]
 *    summary: (o) Get Subcourse detail
 *    operationId: SubcourseDetail
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: number
 *         required: true
 *         description: The subCourse Id
 *    responses:
 *     '200':
 *       description: 'Successfully get subCourse detail'
 *       headers: {}
 *     '400':
 *       description: 'Error to get subCourse detail'
 *       headers: {}
 */
router.get('/subcourse/detail/:id', authenticateUser, getSubCourseDetail);

/**
 * @swagger
 * paths:
 *  /jobs/subcourse/sample/detail/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *      type: string
 *      required: true
 *      description: The subcourse detail by subcourse id
 *   get:
 *    tags: [Jobs]
 *    summary: Get Subcourse sample detail
 *    operationId: SubcourseSampleDetail
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: number
 *         required: true
 *         description: The subCourse Id
 *    responses:
 *     '200':
 *       description: 'Successfully get subCourse sample detail'
 *       headers: {}
 *     '400':
 *       description: 'Error to get subCourse sample detail'
 *       headers: {}
 */
router.get('/subcourse/sample/detail/:id', getSubCourseSampleDetail);

/**
 * @swagger
 * paths:
 *  /jobs/subcourse/progress/update:
 *   post:
 *    tags: [Jobs]
 *    summary: (o) update customer's progress for this subcourse
 *    operationId: updateSubcourseCustomer
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              maincourseId: 15
 *              subcourseId: 20
 *    responses:
 *     '200':
 *       description: 'Successfully updated customer progress'
 *       headers: {}
 *     '400':
 *       description: 'Error to update customer progress'
 *       headers: {}
 */
router.post('/subcourse/progress/update', authenticateUser, updateCustomerToSubCourse);

/**
 * @swagger
 * paths:
 *  /jobs/order/create:
 *   post:
 *    tags: [Jobs]
 *    summary: (o) create order
 *    operationId: createorder
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/OrderSchema'
 *          example:
 *              customerid: 15
 *              amount: 200000
 *              title: 수채화강의 외 1강
 *              courses: [13]
 *              paymentid: imp_00001
 *    responses:
 *     '200':
 *       description: 'Successfully create order'
 *       headers: {}
 *     '400':
 *       description: 'Error to create order'
 *       headers: {}
 */
router.post('/order/create', authenticateUser, createOrder);

/**
 * @swagger
 * paths:
 *  /jobs/config/get:
 *   get:
 *    tags: [Jobs]
 *    summary: get Configuration value
 *    operationId: getConfiguration
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/configSchema'
 *    responses:
 *     '200':
 *       description: 'Successfully get configuration'
 *       headers: {}
 *     '400':
 *       description: 'Error to get configuration'
 *       headers: {}
 */
router.get('/config/get', getConfig);

module.exports = router;
