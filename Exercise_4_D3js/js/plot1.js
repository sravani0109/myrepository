// set the dimensions of the canvas
var margin = {top: 100, right: 20, bottom: 70, left: 100},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
//var formatPercent = d3.format(".0%");

// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .2);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
		.ticks(10);
    //.tickFormat(formatPercent);

var tip = d3.tip()
   .attr('class', 'd3-tip')
   .offset([-10, 0])
   .html(function(d) {
   return "<strong>Arable land (in %):</strong> <span style='color:red'>" + d.perc + "</span>";
   })

// add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);
// load the data
d3.json("json/plot1.json", function(error, dat) {

    data = dat.list;
    data.forEach(function(d) {
        d.year = d.year;
        d.perc = +d.perc;
    });

  // scale the range of the data
  x.domain(data.map(function(d) { return d.year; }));
  y.domain([ 52.35, d3.max(data, function(d) { return d.perc; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .text("Arable perc");



    // Title
    svg.append("text")
    		.attr("x", (width / 2))
    		.attr("y", 0 - (margin.top / 2))
    		.attr("text-anchor", "middle")
    		.style("font-size", "24px")
    		.style("text-decoration", "underline")
    		.text("Arable land of India (in %)");


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.perc); })
      .attr("height", function(d) { return height - y(d.perc); })
			.on('mouseover', tip.show)
      .on('mouseout', tip.hide);




});
