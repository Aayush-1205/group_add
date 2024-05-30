const express = require("express");
const router = express.Router();
const Group = require("../Models/Group");
const User = require("../Models/User");
const authMiddleware = require("../Middlewares/authMiddleware");

router.post("/create", authMiddleware, async (req, res) => {
  const { name } = req.body;
  const group = new Group({ name, members: [req.userId] });
  await group.save();
  await User.findByIdAndUpdate(req.userId, { $push: { groups: group._id } });
  res.json(group);
});

router.post("/add-user", authMiddleware, async (req, res) => {
  const { groupId, userId } = req.body;
  await Group.findByIdAndUpdate(groupId, { $push: { members: userId } });
  await User.findByIdAndUpdate(userId, { $push: { groups: groupId } });
  res.json({ message: "User added to group" });
});

router.post("/invite", authMiddleware, async (req, res) => {
  const { groupId, email } = req.body;
  await Group.findByIdAndUpdate(groupId, { $push: { invitations: { email } } });
  res.json({ message: "Invitation sent" });
});

router.get("/search", async (req, res) => {
  const { name } = req.query;
  const groups = await Group.find({ name: new RegExp(name, "i") });
  res.json(groups);
});

module.exports = router;
