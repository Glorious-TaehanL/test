const express = require('express');
const { getNoticeList, getMainCourse, getMainCourseInfor, getAccessMainCourse, getSubCourse, getSubCourseDetail } = require('../controllers/jobsApiController');
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
 *    summary: Get Access Main Course id list
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
 *    summary: Get Subcourse detail
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
router.get('/subcourse/detail/:id', getSubCourseDetail);

module.exports = router;
