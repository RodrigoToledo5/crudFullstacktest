//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Usuario } = require('./src/db.js');
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const {
  PASS,
  EMAIL,
  FIRST_NAME,
  LAST_NAME
} = process.env;
const port = process.env.PORT || 3001

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const token = v4()
  const hashPassword = await bcrypt.hash(PASS, 5);
  try {
    const user=await Usuario.findOrCreate({
      where: {
        email: EMAIL,
        password: hashPassword,
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        token: token,
      }
    })
    console.log(user[0].token)
  }
  catch (error) {
    console.log(error.message)
  }
  server.listen(port, () => {

    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
