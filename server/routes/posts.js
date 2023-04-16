import express from "express";

import {
  getPostsBySearch,
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/search").get(getPostsBySearch);
router.route("/").get(getPosts).post(auth, createPost);
router
  .route("/:id")
  .get(getPost)
  .patch(auth, updatePost)
  .delete(auth, deletePost);
router.route("/:id/likePost").patch(auth, likePost);
router.route("/:id/comment").post(auth, commentPost);

export default router;
