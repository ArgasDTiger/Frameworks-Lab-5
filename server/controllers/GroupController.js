const Group = require('../models/group');

class GroupController {
  static async getAllGroups(req, res) {
    try {
      const groups = await Group.find({});
      res.json(groups);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async createGroup(req, res) {
    try {
      const group = new Group(req.body);
      await group.save();
      res.status(201).json(group);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async updateGroup(req, res) {
    try {
      const groupId = req.params.id;
      const updatedGroup = await Group.findByIdAndUpdate(groupId, req.body, { new: true });

      if (!updatedGroup) {
        return res.status(404).json({ message: "Group not found" });
      }

      res.json(updatedGroup);
    } catch (err) {
      console.error('Error updating group:', err);
      res.status(500).json({ message: "Error updating group", error: err.message });
    }
  }

  static async deleteGroup(req, res) {
    try {
      const result = await Group.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Group not found" });
      }
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting group:', err);
      res.status(500).json({ message: "Error deleting group", error: err.message });
    }
  }
}

module.exports = GroupController;
