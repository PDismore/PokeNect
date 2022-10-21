const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Bio = require("./Bio");

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Bio.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasOne(Bio, {
  foreignKey: "user_id",
});

module.exports = { User, Post, Comment, Bio };
