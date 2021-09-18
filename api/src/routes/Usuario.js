const express = require('express');
const router = express.Router();
const {Usuario} = require('../db');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
  const {email,password} = req.query;
  console.log(email)
  const user=await Usuario.findByPk(email);
  bcrypt.compare(password, user.password, function(err, result) {
    if(result){
      res.status(200).json({token:user.token,firstName:user.firstName,lastName:user.lastName});
    }
    else{
      res.status(404).json(err)
    }
});
}
)

module.exports = router;