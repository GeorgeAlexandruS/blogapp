const express = require('express')

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

const validateMiddleware = require("./middleware/validateMiddleware");

//const path = require('path')
//const BlogPost = require('./models/BlogPost.js')

app.use(fileUpload())

//connection to mongodb
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//routing
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.listen(4000, () => {
  console.log('App listening on port 4000 ...')
})

app.use('/posts/new', validateMiddleware)

app.get('/create', newPostController)
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.post('/posts/store', storePostController)

app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)
app.get('/auth/login',loginController)
app.post('/users/login', loginUserController)


/*

const validateMiddleWare = (req,res,next)=>{
    if(req.files == null || req.body.title == null || req.body.title == null){
        return res.redirect('/posts/new')
    }
    next()
}

app.get('/post/:id',async (req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    console.log(blogpost)
    res.render('post',{
        blogpost
    });
})

app.post('/posts/store', (req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'public/img',image.name),async (error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })
})

app.get('/',async (req,res)=>{
    console.log("home starting...")
    const blogposts = await BlogPost.find({})
    res.render('index',{
        blogposts
    });
})
*/
