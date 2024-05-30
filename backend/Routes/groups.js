const express = require("express");
const router = express.Router();
const Group = require('../Models/Group')

// Create a group
router.post("/", async (req, res) => {
  const { name, description, members } = req.body;
  const newGroup = new Group({ name, description, members });
  await newGroup.save();
  res.status(201).send(newGroup);
});

// Invite users to a group
router.post("/:id/invite", async (req, res) => {
  const { members } = req.body;
  const group = await Group.findById(req.params.id);
  group.members.push(...members);
  await group.save();
  res.status(200).send(group);
});

// Search groups with detailed filtering
router.get("/search", async (req, res) => {
  const { q } = req.query;
  const regex = new RegExp(q, "i");
  const groups = await Group.find({
    $or: [{ name: regex }, { description: regex }, { members: regex }],
  });
  res.status(200).send(groups);
});

module.exports = router;
