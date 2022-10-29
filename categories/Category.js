const Sequelize = require('sequelize');
const connection = require('../database/database.js');


const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

/*
    - To create main categories: -
    
    Category.create({title: "Poema"});
    Category.create({title: "Crônica"});
    Category.create({title: "Conto"});
    
*/

//Category.sync({ force: true });


module.exports = Category;