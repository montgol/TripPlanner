
function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

var days, currentDay;

$(document).ready(function () {
	days = [];
	
	dayList = [];
		$.get('/days', function(data) {
			dayList = data;
			len = dayList.length;
			for(var i = 0; i<len; i++) {
				day = new Day();
				day.number = data[i].number;
				day._id = data[i]._id;
			};

			currentDay = days[0];
			console.log(days);
	})
});