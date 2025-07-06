const User = require("../models/userModel");

exports.saveUser = async (req, res) => {
  const { clerkId, email, name, authMethod } = req.body;
  try {
    let user = await User.findOne({ clerkId });
    if (!user) {
      user = new User({ clerkId, email, name, authMethod });
      await user.save();
    }
    res.json({ message: "User saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
