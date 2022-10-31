const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Follower = require("./Follower")

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

User.belongsToMany(User, {
  through: Follower,
  as: 'Followers',
  foreignKey: 'follower_id'
})

User.belongsToMany(User, {
  through: Follower,
  as: 'Followed',
  foreignKey: 'followed_id'
})

Follower.belongsTo(User, {
  foreignKey: 'follower_id'
})

Follower.belongsTo(User, {
  foreignKey: 'followed_id'
})

User.hasMany(Follower, {
  foreignKey: 'follower_id'
})

User.hasMany(Follower, {
  foreignKey: 'followed_id'
})

module.exports = { User, Post, Comment };
