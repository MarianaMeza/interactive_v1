var itemSize = 20;
var Border = 1;
var cellSize = itemSize - 1 + Border;
var rowSortOrder = false;
var colSortOrder = false;
var data_r;
var data_c;
var groupedData;

var margin = {top: 50, right: 10, bottom: 20, left: 100};
var width = 720 - margin.right - margin.left;
var height = 340 - margin.top - margin.bottom;

var svg = d3.select('#heatmap')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-20, 0])
	.html(function(d) {
		return '<div><span>Month:</span> <span style=\'color:white\'>' + d.month + '</span></div>' +
			'<div><span>Day:</span> <span style=\'color:white\'>' + d.day + '</span></div>' +
			'<div><span>Total Homicides:</span> <span style=\'color:white\'>' + d.valuePol + '</span></div>';
	});
svg.call(tip);


var monthName;
var dayName;
var numday;
var nummonth;

// Define color by quartiles
var domain1 = [23, 44, 67, 100]; //quartiles
var range1 = ['white', '#F5F5F5', '#F08080',  '#B22222'];
var colorScaleLin = d3.scaleLinear()
	.domain(domain1)
	.range(range1);

// load data
var files = ['./heatmap_data.csv'];
var promises = [];

promises.push(d3.csv(files[0]));

Promise.all(promises)
	.then(makeHeatmap)
	.catch(function(err) {
		console.log('Error loading files');
		throw err;
	});

// load the data
function makeHeatmap(data) {
	var data = data[0];

	// like the waffle need to find unique values or keys for days and months
   var data = data.map(function(item) {
		var newItem = {};
		newItem.month = item.Month;
		newItem.day = item.Day;
		newItem.valuePol = item.Value;
		return newItem;
	});

	// unique month
	var month_names = data.map(function(d) {
		return d.month;
	});

	monthName = d3.set(month_names).values();
	nummonth = monthName.length;

	// unique day
	var day = data.map(function(d) {
		return d.day;
	});

	dayName = d3.set(day).values();
	numday = dayName.length;

	// row labels
	var rowLabels = svg.append('g')
		.attr('class', 'rowLabels')
		.selectAll('.rowLabels')
		.data(monthName)
		.enter().append('text')
		.text(function(d) {
			return d;
		})
		.attr('x', 0)
		.attr('y', function(d, i) {
			return i * cellSize;
		})
		.attr('transform', function(d, i) {
			return 'translate(-3, 11)';
		})
		.attr('class', 'rowLabel mono')
		.attr('id', function(d) {
			return 'rowLabel_' + monthName.indexOf(d);
		})
		.attr('label-r', function(d) {
			return monthName.indexOf(d);
		})
		.attr('font-weight', 'normal')
		.style('text-anchor', 'end')
		.on('click', function(d, i) {
			rowSortOrder = !rowSortOrder;
			sortByValues('r', i, rowSortOrder);
		});

	// columns labels
	var colLabels = svg.append('g')
		.attr('class', 'colLabels')
		.selectAll('.colLabels')
		.data(dayName)
		.enter().append('text')
		.text(function(d) {
			return d;
		})
		.attr('transform', function(d, i) {
			return 'translate(' + (i * cellSize) + ', 260) rotate(-65)';
		})
		.attr('class', 'colLabel mono')
		.attr('id', function(d) {
			return 'colLabel_' + dayName.indexOf(d);
		})
		.attr('label-c', function(d) {
			return dayName.indexOf(d);
		})
		.attr('font-weight', 'normal')
		.style('text-anchor', 'left')
		.attr('dx', '.8em')
		.attr('dy', '.5em')
		.on('click', function(d, i) {

		});

	//make the squares (changed name so not to confuse with waffle)
	var cells = svg.selectAll('.cell')
		.data(data)
		.enter()
		.append('g')
		.append('rect')
		.attr('data-value', function(d) {
			return d.valuePol;
		})
		.attr('data-r', function(d) {
			return monthName.indexOf(d.month);
		}) //start with
		.attr('data-c', function(d, i) {
			if(monthName.includes(d.month) & d.day == '1') var idc = 0;
			else if(monthName.includes(d.month) && d.day == '2') var idc = 1;
			else if(monthName.includes(d.month) && d.day == '3') var idc = 2;
			else if(monthName.includes(d.month) && d.day == '4') var idc = 3;
			else if(monthName.includes(d.month) && d.day == '5') var idc = 4;
			else if(monthName.includes(d.month) && d.day == '6') var idc = 5;
			else if(monthName.includes(d.month) && d.day == '7') var idc = 6;
			else if(monthName.includes(d.month) && d.day == '8') var idc = 7;
			else if(monthName.includes(d.month) && d.day == '9') var idc = 8;
			else if(monthName.includes(d.month) && d.day == '10') var idc = 9;
			else if(monthName.includes(d.month) && d.day == '11') var idc = 10;
			else if(monthName.includes(d.month) && d.day == '12') var idc = 11;
			else if(monthName.includes(d.month) && d.day == '13') var idc = 12;
			else if(monthName.includes(d.month) && d.day == '14') var idc = 13;
			else if(monthName.includes(d.month) && d.day == '15') var idc = 14;
			else if(monthName.includes(d.month) && d.day == '16') var idc = 15;
			else if(monthName.includes(d.month) && d.day == '17') var idc = 16;
			else if(monthName.includes(d.month) && d.day == '18') var idc = 17;
			else if(monthName.includes(d.month) && d.day == '19') var idc = 18;
			else if(monthName.includes(d.month) && d.day == '20') var idc = 19;
			else if(monthName.includes(d.month) && d.day == '21') var idc = 20;
			else if(monthName.includes(d.month) && d.day == '22') var idc = 21;
			else if(monthName.includes(d.month) && d.day == '23') var idc = 22;
			else if(monthName.includes(d.month) && d.day == '24') var idc = 23;
			else if(monthName.includes(d.month) && d.day == '25') var idc = 24;
			else if(monthName.includes(d.month) && d.day == '26') var idc = 25;
			else if(monthName.includes(d.month) && d.day == '27') var idc = 26;
			else if(monthName.includes(d.month) && d.day == '28') var idc = 27;
			else if(monthName.includes(d.month) && d.day == '29') var idc = 28;
			else if(monthName.includes(d.month) && d.day == '30') var idc = 29;
			else if(monthName.includes(d.month) && d.day == '31') var idc = 30;
			return idc;
		})
		.attr('class', function() {
			var idr = d3.select(this).attr('data-r'); // row
			var idc = d3.select(this).attr('data-c'); // column
			return 'cell cr' + idr + ' cc' + idc;
		})
		.attr('width', cellSize)
		.attr('height', cellSize)
		.attr('x', function(d) {
			var c = d3.select(this).attr('data-c');
			return c * cellSize;
		})
		.attr('y', function(d) {
			var r = d3.select(this).attr('data-r');
			return r * cellSize;
		})
		.attr('fill', function(d) {
			var col;
			if(d.valuePol == '') {
				col = '';
			}
			else {
				col = colorScaleLin(d.valuePol);
			}
			return col;
		})
		.on('mouseover', function(d, i) { // on mouseover display r, c and value
			var idr = d3.select(this).attr('data-r');
			var idc = d3.select(this).attr('data-c');
			var value = d3.select(this).attr('data-value');
			d3.select(this).style('stroke', 'orange');
			tip.show(d, i);
		});


			}
