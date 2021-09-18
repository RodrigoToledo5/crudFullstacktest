const express = require('express');
const router = express.Router();
const { Usuario, Post } = require('../db');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  const { token } = req.query;
  try {
    const user = await Usuario.findOne(
      {
        where: {
          token: token,
        }
      }
    )
    if(user){
      try { 
        const post = await Post.findAll({
          order: [['updatedAt', 'DESC']],
        });
        if (post.length>0) {
          res.status(200).send(post);
        }
        else res.status(404).send("dont have post")
      }
      catch (err) {
        res.status(404).send(err)
      }
    }
  }
  
 catch(error){
   res.status(404).send(error)
 }
}
)

router.post('/', async (req, res) => {
  const { token, title, subtitle, description } = req.body;
  
  try {
    
    const user = await Usuario.findOne(
      {
        where: {
          token: token,
        }
      }
    )
    if (user) {
      try {
        const post=await Post.create(
          {
            title,
            subtitle,
            description,
          }
        )
        post.setUsuario();
        res.status(200).send(post)
      }
      catch (error) {
        res.status(404).send(error)
      }
    }
  }
  catch (err) {
    res.status(404).send(err)
  }
}
)

router.put('/', async (req, res) => {
  const { token, title, subtitle, description,id } = req.body;
  
  try {
    
    const user = await Usuario.findOne(
      {
        where: {
          token: token,
        }
      }
    )
    if (user) {
      try {
        let post=await Post.findByPk(id);
        if(post){
          post.title=title;
          post.subtitle=subtitle
          post.description=description
          await post.save();
          res.status(200).send(post)
        }
        else {
          res.status(404).send("id not found")
        }
      }
      catch (error) {
        res.status(404).send(error)
      }
    }
  }
  catch (err) {
    res.status(404).send(err)
  }
}
)
router.delete('/', async (req, res) => {
  const { token,id } = req.body;
  console.log(token,id)
  try {
    const user = await Usuario.findOne(
      {
        where: {
          token: token,
        }
      }
    )
    if (user) {
      try {
        let post=await Post.findByPk(id);
        if(post){
          post.destroy();
          res.status(200).send(`post ${id} has deleted`)
        }
        else {
          res.status(404).send("id not found")
        }
      }
      catch (error) {
        res.status(404).send(error)
      }
    }
  }
  catch (err) {
    res.status(404).send(err)
  }
}
)

module.exports = router;