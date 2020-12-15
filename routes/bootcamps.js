const express = require('express')

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/bootcamps')

const router = express.Router()

router.route('/').get(getBootcamps).post(createBootcamp)

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)

// Example: no need to specify routes like that because it would already know since I brought it in app.js with app.use(), just / is good enough
// router.get('/api/v1/bootcamps', (req, res) => {
//   res.status(200).json({ success: true, msg: 'Show all bootcamps' })
// })

// Since I've got controllers directory I've got a much neater way of structuring my API, so no need fot the following
// router.get('/', (req, res) => {
//   res.status(200).json({ success: true, msg: 'Show all bootcamps' })
// })

// router.get('/:id', (req, res) => {
//   res.status(200).json({ success: true, msg: `Get bootcamp ${req.params.id}` })
// })

// router.post('/', (req, res) => {
//   res.status(200).json({ success: true, msg: 'Create new bootcamp' })
// })

// router.put('/:id', (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Update bootcamp ${req.params.id}` })
// })

// router.delete('/:id', (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Delete bootcamp ${req.params.id}` })
// })

module.exports = router
