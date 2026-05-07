import exp from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { UserModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";

export const adminApp = exp.Router();

adminApp.get("/users", verifyToken("ADMIN"), async (req, res) => {
  const users = await UserModel.find({ role: { $ne: "ADMIN" } }).select("-password");

  res.status(200).json({ message: "users", payload: users });
});

adminApp.patch("/users", verifyToken("ADMIN"), async (req, res) => {
  const { userId, isUserActive } = req.body;

  const user = await UserModel.findOneAndUpdate(
    { _id: userId, role: { $ne: "ADMIN" } },
    { $set: { isUserActive } },
    { new: true },
  ).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User status updated", payload: user });
});

adminApp.get("/articles", verifyToken("ADMIN"), async (req, res) => {
  const articles = await ArticleModel.find()
    .populate("author", "firstName lastName email role profileImageUrl isUserActive")
    .populate("comments.user", "firstName lastName email profileImageUrl");

  res.status(200).json({ message: "articles", payload: articles });
});

adminApp.put("/articles", verifyToken("ADMIN"), async (req, res) => {
  const { articleId, title, category, content } = req.body;

  const article = await ArticleModel.findByIdAndUpdate(
    articleId,
    { $set: { title, category, content } },
    { new: true },
  ).populate("author", "firstName lastName email role profileImageUrl isUserActive");

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.status(200).json({ message: "Article updated", payload: article });
});

adminApp.patch("/articles", verifyToken("ADMIN"), async (req, res) => {
  const { articleId, isArticleActive } = req.body;

  const article = await ArticleModel.findByIdAndUpdate(
    articleId,
    { $set: { isArticleActive } },
    { new: true },
  ).populate("author", "firstName lastName email role profileImageUrl isUserActive");

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.status(200).json({ message: "Article status updated", payload: article });
});
