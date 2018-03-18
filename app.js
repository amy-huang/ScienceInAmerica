drawChart('total_data.tsv', 'Total Percent Change in Industry Entry');
drawChart('lifesciences_data.tsv', 'Life Sciences Percent Change in Industry Entry');
drawChart('physicalsciences_data.tsv', 'Physical Sciences Percent Change in Industry Entry');
drawChart('mathcs_data.tsv', 'Mathematics and Computer Science Percent Change in Industry Entry');
drawChart('socialsciences_data.tsv', 'Psychology and Social Sciences Percent Change in Industry Entry');
drawChart('engineering_data.tsv', 'Engineering Percent Change in Industry Entry');
drawChart('education_data.tsv', 'Education Percent Change in Industry Entry');
drawChart('humanities_data.tsv', 'Humanities and Arts Percent Change in Industry Entry');
drawChart('other_data.tsv', 'Other Percent Change in Industry Entry');

function drawChart(tsv_name, chart_title) {
	'use strict'; // Variable declaration
var margin = { top: 40, right: 20, bottom: 40, left: 30 };
var height = 460 - margin.top - margin.bottom;
var width = 900 - margin.left - margin.right;

// Add svg to
var svg = d3.select('body').
append('svg').
attr('width', width + margin.left + margin.right).
attr('height', height + margin.top + margin.bottom).
append('g').
attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// X scale
var x = d3.scaleLinear().
range([0, width]);
var y = d3.scaleBand().
rangeRound([height, 0]);

var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y).
tickSize(6, 0);

d3.tsv(tsv_name, type, function (error, data) {
  x.domain([-17, 17]).nice();
  y.domain(data.map(function (d) {return d.name;}));

  svg.selectAll('.bar').
  data(data).
  enter().append('rect').
  attr('class', function (d) {
    return "bar bar--" + (d.value < 0 ? "negative" : "positive");
  }).
  attr('x', function (d) {return x(Math.min(0, d.value));}).
  attr('y', function (d) {return y(d.name);}).
  attr('width', function (d) {return Math.abs(x(d.value) - x(0));}).
  attr('height', 45);

  svg.append('g').
  attr('class', 'x axis').
  attr('transform', 'translate(0,' + height + ')').
  call(xAxis);

  var tickNegative = svg.append('g').
  attr('class', 'y axis').
  attr('transform', 'translate(' + x(0) + ',0)').
  call(yAxis).
  selectAll('.tick').
  filter(function (d, i) {return data[i].value < 0;});

  tickNegative.select('line').
  attr('x2', 6);

  tickNegative.select('text').
  attr('x', 9).
  style('text-anchor', 'start');

  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")        
	   .text(chart_title);


	});
}


function type(d) {
  d.value = +d.value;
  return d;
}