const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  addAssignment,
  removeAssignment,
} = require('../../controllers/thoughtsController');


router.route('/').get(getThought).post(createThought);


router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);


router.route('/:thoughtId/assignments').post(addAssignment);


router.route('/:thoughtId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;