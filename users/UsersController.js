const express = require('express');
const router = express.Router();
const User = require('./User');

router.get('/login', (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let data = {error: "Invalid email/password"};
    if(email != undefined){
        User.findOne({
        where:{email: email}
        }).then(user=>{
            if(user!= undefined){
                if(user.password == password){
                    res.json(user);
                }else{
                    res.json(data);
                }
            }else{
                res.json(data);
            }
        })
    }else{
        res.json(data);
    }
});

router.post('/singup', (req,res)=>{
	let {name, email, password} = req.body;
	if(name == undefined || email == undefined || password == undefined){
		res.sendStatus(404);
		res.end();
	}else{
		User.create({name: name, email: email, password: password});
		return res.sendStatus(200);
	}
	
})

module.exports = router;
