d3.json("json/plot5.json", function(err,dat){
    var li = dat.continents;
    var data = li[0].eu;
    var data2 = li[1].as;
    var data3 = li[2].na;
    var data4 = li[3].af;
    var data5 = li[4].sa;
    var data6 = li[5].oc;
    var color = d3.scale.category20();
    var vis = d3.select("#visualisation"),
        WIDTH = 1000,
        HEIGHT = 500,
        MARGINS = {
            top: 50,
            right: 20,
            bottom: 50,
            left: 200
        },
        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1960, 2015]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 550000000]),
        lSpace = WIDTH/6;
        xAxis = d3.svg.axis()
        .scale(xScale),
        yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);



     var lineGen = d3.svg.line()
        .x(function(d) {
            return xScale(d.year);
        })
        .y(function(d) {
            return yScale(d.hectares);
        })
        .interpolate("basis");

    vis.append('svg:path')
        .attr('d', lineGen(data))
        .attr('stroke', color(1))
        .attr('stroke-width', 3)
        .attr('fill', 'none');
    vis.append('svg:path')
        .attr('d', lineGen(data2))
        .attr('stroke', color(2))
        .attr('stroke-width', 3)
        .attr('fill', 'none');
   vis.append('svg:path')
        .attr('d', lineGen(data3))
        .attr('stroke', color(3))
        .attr('stroke-width', 3)
        .attr('fill', 'none');
  vis.append('svg:path')
     .attr('d', lineGen(data4))
     .attr('stroke', color(4))
     .attr('stroke-width', 3)
     .attr('fill', 'none');
  vis.append('svg:path')
     .attr('d', lineGen(data5))
     .attr('stroke', color(5))
     .attr('stroke-width', 3)
     .attr('fill', 'none');
  vis.append('svg:path')
     .attr('d', lineGen(data6))
     .attr('stroke',color(6))
     .attr('stroke-width', 3)
     .attr('fill', 'none');
  vis.append('svg:g')
    .attr("class","legend")
    .attr("height",100)
    .attr("width",100)
    .attr("transform","translate(-20,30)");

    vis.append("text")
    .attr("x", (lSpace / 2) + 1 * lSpace)
    .attr("y", HEIGHT)
    .style("fill", color(1))
    .attr("class", "legend")
    .text("EU");

    vis.append("text")
    .attr("x", (lSpace / 2) + 1.5 * lSpace)
    .attr("y", HEIGHT)
    .style("fill", color(2))
    .attr("class", "legend")
    .text("AS");

    vis.append("text")
    .attr("x", (lSpace / 2) + 2 * lSpace)
    .attr("y", HEIGHT)
    .style("fill", color(3))
    .attr("class", "legend")
    .text("NA");

    vis.append("text")
    .attr("x", (lSpace / 2) + 2.5 * lSpace)
    .attr("y", HEIGHT)
    .style("fill", color(4))
    .attr("class", "legend")
    .text("AF");

    vis.append("text")
    .attr("x", (lSpace / 2) + 3 * lSpace)
    .attr("y", HEIGHT)
    .style("fill", color(5))
    .attr("class", "legend")
    .text("SA");

    vis.append("text")
    .attr("x", (lSpace / 2) + 3.5 * lSpace)
    .attr("y", HEIGHT)
    .style("fill", color(6))
    .attr("class", "legend")
    .text("OC");


}
)
