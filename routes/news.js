const express = require('express')
const router = express.Router()

const {
    getAllNews,
    // getJobs,
    createNews,
    updateNews,
    deleteNews,
} = require('../controllers/news')

router.route('/').post(createNews).get(getAllNews)
// router.route('/:id').get(getJobs).delete(deleteJob).patch(updateJob)
router.route('/:id').delete(deleteNews).patch(updateNews)

module.exports = router