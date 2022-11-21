const Express = require('express');
const app = Express();
const port = 3000;
const connection = require('./database/database.js');
const bodyParser = require('body-parser');
const UsersController = require('./users/UsersController.js');
const PostsController = require('./posts/PostsController.js');
const CategoriesController = require('./categories/CategoriesController.js');
const cors = require('cors');
const e = require('express');

app.use(Express.static('public'));
app.set('json spaces', 40);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
	console.log('here');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	app.use(cors());
	next();
})




app.use('/', UsersController);

app.use('/', PostsController);
app.use('/', CategoriesController);



app.listen(3000, ()=>console.log(`Server runing in ${port} port`));
