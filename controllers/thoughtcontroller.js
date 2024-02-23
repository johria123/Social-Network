const { User, Thought } = require('../models');

module.exports = {

  async getUser(req, res) {
    try {
      const user = await User.find()
      .populate('thought');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate('thought');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thought } });
      res.json({ message: 'User and thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
 
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

