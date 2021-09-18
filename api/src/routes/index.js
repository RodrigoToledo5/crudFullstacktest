const { Router ,json} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const usuario = require("./Usuario")
const post = require("./Post")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 //router.use('/Countries', countries);
 //router.use('/Activity', activity);



router.use("/auth",usuario);//aca puedo pasar midlewares
router.use("/post",post)



module.exports = router;
