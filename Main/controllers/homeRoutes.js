const router = require('express').Router();
const {Post, User, Comment } = require('../models');
const { beforeFindAfterExpandIncludeAll } = require('../models/User');
const withAuth = require('../utils/auth');


// Get login

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


// Get Homepage

router.get('/', async(req,res)=>{
  try{
    const postData = await Post.findAll({
      include:[
        { 
          model:User,
        attributes:['user_name']
      }
      ],
    })

    const posts = postData.map((post)=>
    post.get({plain: true})
).reverse();

console.log (`logged in: ${req.session.logged_in}`)
res.render('homepage', {
  posts, 
  logged_in: !req.session.logged_in,
})
  }catch(err){
    console.log(err)
  }
})
  

// Get All Posts by id


router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            'id',
            'first_name',
            'last_name',
            'user_name'
          ],
        },

        {
          model: Comment,
          attributes: [
            'comment',
            'date_created',
          ],
        },

        {
          model: User,
          attributes: [
            'user_name'
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post)

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User Dashboard


router.get ('/dashboard', async (req,res) => {
  if(!req.session.logged_in){
    res.render ('login', {logged_in: !req.session.logged_in})
    return
  }
  try{
    const posts = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      raw: true
    })

    if (posts.length > 0) {
      posts.reverse()
    }
    else {
      const posts = {none:true}
    }
    res.render('dashboard', {posts, logged_in: !req.session.logged_in})
  } catch(err){
    res.status(400).json({message: 'not logged in'})
  }
})

// Load Creat Account Page

router.get('/create-account', async (req, res) => {
  res.render ('createUser')
});



// Get new posts

router.get ('/new-post',(req,res) => {
  res.render('newPost',{logged_in: !req.session.logged_in})
})

module.exports = router;


// This should be all set 
