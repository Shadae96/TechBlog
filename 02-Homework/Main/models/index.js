const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsToMany(Post,{
  foreignKey: 'comment_id'
})

Comment.hasMany(User,{
  foreignKey: 'user_id'
})

Post.belongsTo(User, {
  foreignKey: 'user_id'
})

Post.hasMany(Comment, {
  foreignKey: 'post_id'
})


module.exports = { User, Post, Comment};



//THIS IS ALL SET