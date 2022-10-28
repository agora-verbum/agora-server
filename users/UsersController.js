const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');


router.get('/user', (req,res)=>{
    User.findAll().then(users=>{
        res.statusCode = 200;
        res.json(users);
    });
});

router.get('/user/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        User.findOne({where:{id:id}})
        .then(user=>{
            if(user == undefined){
                res.sendStatus(404)
            }else{
                res.statusCode = 200;
                res.json(user);
            }
        })
    }
});

router.post('/user', (req,res)=>{
    let {name, email, password} = req.body;

    if(email == undefined || name == undefined || password == undefined){
        res.sendStatus(400);
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
                }).catch(e=>{
                    res.sendStatus(409);
                })
            }else{
                res.sendStatus(409);
            }
        });
    }
});

router.delete('/user/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        User.findOne({where:{id: id}})
        .then(user=>{
            if(user == undefined){
                res.sendStatus(404);
            }else{
                User.destroy({where:{id: id}});
                res.sendStatus(200);
            }
        })
    }
});

router.put('/user/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        User.findOne({where:{id:id}})
        .then(user=>{
            if(user == undefined){
                res.sendStatus(404)
            }else{
                res.statusCode = 200;
                let {name, email, password} = req.body;

                if(name != undefined){
                    user.update({name: name},{where:{id:id}});
                }

                if(email != undefined){
                    user.update({email: email},{where:{id:id}});
                }

                if(password != undefined){
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(password, salt);
                    user.update({password: hash},{where:{id:id}});
                }
            }
        })
    }
});

router.post('/login', (req,res)=>{
    let {email, password} = req.body;

    if(email != undefined){
        User.findOne({
        where:{email: email}
        }).then(user=>{
            if(user!= undefined){
                let isValid = bcrypt.compareSync(password, user.password);
                if(isValid){
                    res.statusCode = 201;
                    res.json(user);
                }else{
                    res.sendStatus(401);
                }
            }else{
                res.sendStatus(401);
            }
        })
    }else{
        res.sendStatus(401);
    }
});



module.exports = router;
