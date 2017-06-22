
function renderScatterPlot(dataset, element)
{
  // Setup settings for graphic
  var canvas_width = element.offsetWidth;
  var canvas_height = element.offsetWidth*0.8;
  var padding = 30;  // for chart edges

  // Create scale functions
  var xScale = d3.scale.linear()  // xScale is width of graphic
               .domain([d3.min(dataset, function(d) {
                return d.data[0];  // input domain
                }), d3.max(dataset, function(d) {
                return d.data[0];  // input domain
                })])
                .range([padding, canvas_width - padding * 2]); // output range

  var yScale = d3.scale.linear()  // yScale is height of graphic
               .domain([d3.min(dataset, function(d) {
                  return d.data[1];  // input domain
                }), d3.max(dataset, function(d) {
                  return d.data[1];  // input domain
                })])
              .range([canvas_height - padding, padding]);  // remember y starts on top going down so we flip

  var color = d3.scale.category20();
  // Define X axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(0);

  // Define Y axis
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(0);
  var svg = d3.select("#"+element.id)
    .append("svg")
    .attr("width", canvas_width)
    .attr("height", canvas_height);


  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10,0])
    .html(function(d) {
      return "Partido: " + d.party + "<br/>" + "Deputado: " + d.name;
    })
  
  svg.call(tip);
  // Create Circles
  svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")  // Add circle svg
    .attr("cx", function(d) {
      return xScale(d.data[0]);  // Circle's X
      })
      .attr("cy", function(d) {  // Circle's Y
        return yScale(d.data[1]);
      })
      .attr("r", 3) //radius
      .style("fill", function(d) {return color(d.party)})
      .on("mouseover", tip.show/*function (d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Partido: " + d.party + "<br/>" + "Deputado: " + d.name)
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (d3.event.pageX - 28) + "px");
      }*/)
      .on("mouseout", tip.hide/*function (d) {
        tooltip.transition()
                .duration(200)
                .style("opacity",0);
      }*/);

  // Add to X axis
  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (canvas_height - padding) +")")
  .call(xAxis);

  // Add to Y axis
  svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + padding +",0)")
  .call(yAxis);

  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", canvas_width - 18)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", canvas_width - 24)
      .attr("y", 5)
      .attr("dy", ".25em")
      .style("text-anchor", "end")
      .style("font", "10px times")
      .text(function(d) { return d;})
}
