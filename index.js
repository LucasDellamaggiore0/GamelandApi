require('dotenv').config();
const server = require('./src/app.js');
const {sequelize} = require('./src/db.js');




sequelize.sync({force: false}).then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
        // console.log(sequelize.models);
    })
})
