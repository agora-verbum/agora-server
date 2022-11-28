const Express = require('express');
const app = Express();
const port = 3030;
const connection = require('./database/database.js');
const bodyParser = require('body-parser');
const UsersController = require('./users/UsersController.js');
const PostsController = require('./posts/PostsController.js');
const CategoriesController = require('./categories/CategoriesController.js');
const cors = require('cors');
const e = require('express');
app.use(cors());

app.use(Express.static('public'));
app.set('json spaces', 40);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use('/', UsersController);

app.use('/', PostsController);
app.use('/', CategoriesController);



app.listen(port, ()=>console.log(`Server runing in ${port} port`));
