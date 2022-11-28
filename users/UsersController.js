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

router.delete('/user/:id', async (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        database('users').where({id: id}).delete();
        res.sendStatus(200);
    }
});

router.put('/user/:id', async (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let messages = [];
        let id = parseInt(req.params.id);
        let user = await database('users').where({id: id}).select();
        if(user == false){
            res.sendStatus(404);
        }else{
            let {username, name, email, password, biography} = req.body;

            if(name != undefined){
                await database('users').where({id: id}).update({name: name});
            }

            if(biography != undefined){
                await database('users').where({id:id}).update({biography: biography});
            }

            if(password != undefined){
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);
                await database('users').where({id: id}).update({password: hash});
            }

            if(email != undefined){
                let exist = await database('users').where({email: email}).select();
                if(exist == false){
                    await database('users').where({id: id}).update({email: email});
                }else{
                    messages.push({emailError: true});
                }
            }

            if(username != undefined){
                let exist = await database('users').where({username: username}).select();
                if(exist == false){
                    await database('users').where({id:id}).update({username: username});
                }else{
                    messages.push({usernameError: true});
                }
            }

            res.status(200);
            res.json(messages);
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

module.exports = router;