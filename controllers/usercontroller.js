const { ObjectId } = require('mongoose').Types;
const { Thought, user } = require('../models');


const headCount = async () => {
  const numberOfthought = await Thought.aggregate()
    .count('thoughtCount');
  return numberOfthought;
}


const grade = async (thoughtId) =>
  Thought.aggregate([
    
    { $match: { _id: new ObjectId(thoughtIdId) } },
    {
      $unwind: '$assignments',
    },
    {
      $group: {
        _id: new ObjectId(thoughtIdId),
        overallGrade: { $avg: '$assignments.score' },
      },
    },
  ]);

module.exports = {
  
  async getThought(req, res) {
    try {
      const thought = await thought.find();

      const thoughtObj = {
        thought,
        headCount: await headCount(),
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json({
        thought,
        grade: await grade(req.params.thoughtId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      const User = await User.findOneAndUpdate(
        { thought: req.params.thoughtId },
        { $pull: { thought: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'thought deleted, but no user found',
        });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  
  async addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);

    try {
      const thought = await thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async removeAssignment(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};