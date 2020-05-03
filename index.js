const express = require('express')

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const blogController = require('./controllers/blog')
const aboutController = require('./controllers/about')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const logoutController = require('./controllers/logout')

const validateMiddleware = require("./middleware/validateMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const flash = require('connect-flash')



app.use(fileUpload())
app.use(flash())

//connection to mongodb
mongoose.connect('mongodb+srv://masterAdmin:Sl907FkO9jeliOYv@cluster0-wlbjz.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//routing
app.set('view engine', 'ejs')

app.use(express.static('public'))

// app.listen(4000, () => {
//   console.log('App listening on port 4000 ...')
// })

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, () => {
  console.log('App listening on port 4000...')
  console.log('go to http://localhost:4000/')
})

app.use(expressSession({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true
}))

global.loggedIn = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next()
});


app.get('/posts/new', authMiddleware, newPostController)
app.get('/', homeController)
app.get('/blog', blogController)
app.get('/about', aboutController)
app.get('/post/:id', getPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));
