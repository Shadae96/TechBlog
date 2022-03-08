const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.

module.exports = { User, Post, Comment};



START HERE! 