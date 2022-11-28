const express = require('express');
const database = require('../database/database.js');
const date = require('../scripts/Date.js');
const router = express.Router();

router.get('/categories', async (req,res)=>{
    let data = await database('categories').select();
    res.json(data);
});

router.get('/category/:id', async (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = req.params.id;
        let data = await database('categories').where({id: id}).select();
        res.status(201);
        res.json(data);
    }
});

router.post('/category', async (req,res)=>{
    let name = req.body.name;
    if(name == undefined){
        res.sendStatus(400);
    }else{
        await database('categories').insert({name: name, createdAt: date.NowDateTime(), updatedAt: date.NowDateTime()});
        res.sendStatus(201);
    }
});

router.delete('/category/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = req.params.id;
        database('categories').where({id:id}).delete();
        res.sendStatus(200)
    }
});

router.put('/category/:id', async (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = req.params.id;
        let category = await database('categories').where({id: id}).select();
        if(category == false){
            res.send(404);
        }else{
            let {title} = req.body;
            if(title != undefined){
                await database('categories').where({id:id}).update({title: title});
            }
            res.send(200);
        }
    }
});

module.exports = router;