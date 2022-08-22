require('dotenv').config();
const server = require('./src/app.js');
const {sequelize} = require('./src/db.js');
const {PORT} = process.env;



sequelize.sync({force: true}).then(() => {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        // console.log(sequelize.models);
    })
})
