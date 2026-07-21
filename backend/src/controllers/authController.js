import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

function toPublicUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    favourites: user.favourites,
  };
}

// POST /api/auth/register  Body: { name, email, password }
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// POST /api/auth/login  Body: { email, password }
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user._id);
    res.status(200).json({ token, user: toPublicUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/auth/me/favourites — protected
export async function getMyFavourites(req, res) {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "favourites",
      populate: { path: "createdBy", select: "name" },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
