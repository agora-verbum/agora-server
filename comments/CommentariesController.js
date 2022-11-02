const express = require('express');
const router = express.Router();
const Commentary = require('./Commentary.js');

router.get('/commentary', (req,res)=>{
    Commentary.findAll().then(commentaries=>{
        res.statusCode = 200;
	res.json(commentaries);
    });   
});

router.get('/commentary/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = req.params.id;
        Commentary.findOne({where:{id:id}})
        .then(commentary=>{
            if(commentary == undefined){
                res.sendStatus(404);
            }else{
                res.statusCode = 200;
                res.json(commentary);
            }
        });
    }
});

router.put('/commentary/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = req.params.id;
        Commentary.findOne({where:{id:id}})
        .then(commentary=>{
            if(commentary == undefined){
                res.sendStatus(404);
            }else{
                let {content} = req.body;
		if(content != undefined){
                    commentary.update({content: content});
		}
		res.sendStatus(200);
            }
        });
    }
});


router.post('/commentary', (req,res)=>{
    let {content} = req.body;
    if(content == undefined){
        res.sendStatus(400);
    }else{
        Commentary.create({content: content});
	res.sendStatus(200);
    }
});

router.delete('/commentary/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = req.params.id;
        Commentary.findOne({where:{id:id}})
        .then(commentary=>{
            if(commentary == undefined){
                res.sendStatus(404);
            }else{
                Commentary.destroy({where:{id:id}});
            }
        });
    }
});


module.exports = router;
