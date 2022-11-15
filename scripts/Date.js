let date = require('date-and-time');

const Dater = {
	NowDate: function(){
		let now = new Date();
		return date.format(now, 'YYYY-MM-DD');
	},
	NowTime: function(){
		let now = new Date();
		return date.format(now, 'HH:mm:ss');
	},
	NowDateTime: function(){
		let now = new Date();
		return date.format(now, 'YYYY-MM-DD:HH:mm:ss')
	}
}

module.exports = Dater;