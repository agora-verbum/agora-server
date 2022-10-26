const Express = require('express');
const app = Express();
const port = 80;
const connection = require('./database/database.js');
const bodyParser = require('body-parser');
const UsersController = require('./users/UsersController.js');
const User = require('./users/User.js');
const cors = require('cors');
const e = require('express');


app.set('view engine', 'ejs');
app.use(Express.static('public'));
app.set('json spaces', 40);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

connection
    .authenticate()

    .then(() => {
        console.log("Successful connection.");
    })

    .catch((errorMsg)=>{
        console.log(errorMsg);
    });


app.post('/logar', (req,res)=>{
    let {email, password} = req.body;
    res.send(req.body.email);
});

app.get('/create', (req,res)=>{
    User.create({name: "Luca", email: "luca@email.com", password: "123"});
});


app.use('/', UsersController);



app.listen(80, ()=>console.log(`Server runing in ${port} port`));