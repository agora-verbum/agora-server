const express = require('express');
const database = require('../database/database.js');
const date = require('../scripts/Date.js');
const router = express.Router();
const bcrypt = require('bcryptjs');


router.get('/user', async (req,res)=>{
    let data = await database('users').select();
    res.json(data);
    res.status(200);
});

router.get('/user/:id', async (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        let user = await database('users').where({id: id}).select();
        res.status(201);
        res.json(user);
    }
});

router.post('/user', async (req,res)=>{
    let {username, email, password}= req.body;
    if(email == undefined || username == undefined || password == undefined){
        res.sendStatus(400);
    }else{
        let user = await database('users').where({email: email}).orWhere({username:username}).select();
        console.log(user);
        if(user == false){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            database('users').insert({
                username: username,
                email: email,
                password: hash,
                name: username,
                createdAt: date.NowDateTime(),
                updatedAt: date.NowDateTime(),
            }).then(()=>{
                res.sendStatus(201)
            }).catch(e=>{
                res.sendStatus(409);
            });
        }else{
            res.sendStatus(409);
        }
    }
});

router.post('/login', async (req,res)=>{
    let {email, password} = req.body;
    if(email != undefined){
        let user = await database('users').where({email: email}).select();
        if(user.length>0){
            let isValid = bcrypt.compareSync(password, user[0].password);
            if(isValid){
                res.status(201);
                res.json(user);
            }else{
                res.sendStatus(401);
            }
        }else{
            res.sendStatus(401);
        }
}});

/*

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
                res.sendStatus(200);
            }
        })
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


*/
module.exports = router;
