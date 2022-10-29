const express = require('express');
const router = express.Router();
const Category = require('./Category');

router.get('/category', (req,res)=>{
    Category.findAll().then(categories=>{
        res.statusCode = 200;
        res.json(categories);
    });
});

router.get('/category/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = req.params.id;
        Category.findOne({where:{id:id}})
        .then(category=>{
            if(category == undefined){
                res.sendStatus(404);
            }else{
                res.statusCode = 200;
                res.json(category);
            }
        });
    }
});

router.post('/category', (req,res)=>{
    let title = req.body.title;
    if(title == undefined){
        res.sendStatus(400);
    }else{
        Category.create({title: title});
        res.sendStatus(200);
    }
});

router.put('/category/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = req.params.id;
        Category.findOne({where:{id:id}})
        .then(category=>{
            if(category == undefined){
                res.sendStatus(404);
            }else{
                let title = req.body.title;
                if(title != undefined){
                    category.update({title: title}, {where:{id:id}});
                }
                res.sendStatus(200);
            }
        })
    }
});

router.delete('/category/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = req.params.id;
        Category.findOne({where:{id:id}})
        .then(category=>{
            if(category != undefined){
                Category.destroy({where:{id:id}});
                res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }
        })
    }
});

module.exports = router;