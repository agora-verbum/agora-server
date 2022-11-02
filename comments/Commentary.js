const Sequelize = require('sequelize');
const connection = require('../database/database.js');


const Commentary = connection.define('commentaries', {
    content:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Commentary.sync({ force: true });


module.exports = Commentary;

