import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const newPost = new PostMessage(req.body);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { ...post, id },
      {
        new: true,
      }
    );
    console.log(updatePost);
    res.json(updatedPost);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};
