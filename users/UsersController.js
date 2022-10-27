const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');


router.post('/login', (req,res)=>{
    let {email, password} = req.body;
    let data = {error: "Senha/email inválidos!"};
    if(email != undefined){
        User.findOne({
        where:{email: email}
        }).then(user=>{
            if(user!= undefined){
                let isValid = bcrypt.compareSync(password, user.password);
                if(isValid){
                    //res.sendStatus(201);
                    res.json(user);
                }else{
                    //res.sendStatus(401);
                    res.json(data);
                }
            }else{
                //res.sendStatus(401);
                res.json(data);
            }
        })
    }else{
        //res.sendStatus(401);
        res.json(data);
    }
});

router.post('/singup', (req,res)=>{
	let {name, email, password} = req.body;
    let error = {
        dataError: "Algo de errado aconteceu com seus dados.",
        emailError: "O email inserido já está cadastrado."
    };

    if(email == undefined || name == undefined || password == undefined){
        res.json(error.dataError);
        res.statusCode(404);
    }else{
        User.findOne({where: {email: email}}).then(user=>{
            if(user == undefined){
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);
                User.create({
                    name: name,
                    email: email,
                    password: hash
                }).then(()=>{
                    res.sendStatus(201);
                    res.end();
                    
                }).catch(e=>{
                    res.sendStatus(409);
                    res.send(e);
                })
            }else{
                res.sendStatus(409);
                res.json(error.emailError);
            }
        });
    }
});

module.exports = router;
