const User = require("../models/user.model");

// Route 1: Add user
exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Route 2: Add profile
exports.addProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profiles.push(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { profile } = req.query;
    let users = await User.find();

    if (profile) {
      users = users.filter((user) =>
        user.profiles.some((p) => p.profileName === profile)
      );
    }

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    const { name, profile } = req.query;
    const user = await User.findOne({ name });

    if (!user) return res.status(404).json({ message: "User not found" });

    const foundProfile = user.profiles.find((p) => p.profileName === profile);

    if (foundProfile) {
      return res.status(200).json({ user, profile: foundProfile });
    } else {
      return res.status(404).json({
        message: "User found, but profile not found",
        user
      });
    }
  } catch (err) {
    next(err);
  }
};

// Route 5: Update profile URL
exports.updateProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = user.profiles.find((p) => p.profileName === profileName);
    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    profile.url = url;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


exports.deleteProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const initialLength = user.profiles.length;
    user.profiles = user.profiles.filter(
      (p) => p.profileName !== profileName
    );

    if (user.profiles.length === initialLength)
      return res.status(404).json({ message: "Profile not found" });

    await user.save();
    res.status(200).json({ message: "Profile deleted", user });
  } catch (err) {
    next(err);
  }
};
