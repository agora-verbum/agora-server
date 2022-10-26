const Sequelize = require('sequelize');

const connection = new Sequelize('agoradb', 'root', 'a', {
	host:'localhost',
	dialect: 'mysql',
	timezone: "-03:00"
});


module.exports = connection;