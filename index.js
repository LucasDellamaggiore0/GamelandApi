require('dotenv').config();
const server = require('./src/app.js');
const {sequelize} = require('./src/db.js');
const {PORT} = process.env;



sequelize.sync({force: false}).then(() => {
    server.listen(process.env.PORT || 3001, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
        // console.log(sequelize.models);
    })
})
