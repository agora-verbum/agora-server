const express = require('express');
const database = require('../database/database.js');
const date = require('../scripts/Date.js');
const router = express.Router();

router.get('/posts', async (req,res)=>{
	let posts = await database('posts').select();
	res.status(201);
	res.json(posts);
});

router.get('/post/:id', async(req,res)=>{
	if(!isNaN(req.params.id)){
		let id = req.params.id;
		let post = await database('posts').where({id:id}).select();
		res.status(201);
		res.json(post);
	}else{
		res.sendStatus(401);
	}
});

router.get('/posts/category/:id', async(req,res)=>{
	if(!isNaN(req.params.id)){
		let id = parseInt(req.params.id);
		let result = await database('categories_has_posts').innerJoin('posts', 'posts.id', 'categories_has_posts.postId').where({categoryId: id});
		res.status(201);
		res.json(result);
	}else{
		res.sendStatus(401);
	}
});

router.get('/posts/user/:id', async(req,res)=>{
	if(!isNaN(req.params.id)){
		let id = parseInt(req.params.id);
		let result = await database('posts').where({userId: id}).select();
		res.status(201);
		res.json(result);
	}else{
		res.sendStatus(401);
	}
});

module.exports = router;