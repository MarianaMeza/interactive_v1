/* global d3 */

var margin = {top:10,right:150,bottom:30,left:0},
    width  = 600 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom,
    boxSize = 20, //size of each box
    boxGap = 3, //space between each box
    howManyAcross = Math.floor(width / boxSize);

  var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom));

  var categoryHeading = "age_r"

  var g = svg.append("g")
          .attr("transform","translate(" + margin.left + "," + margin.top + ")");

      //rainbow colors
  var colors = d3.scaleSequential(d3.interpolateCubehelixDefault);

  d3.csv('homicide_sample.csv').then(function(data, i){

       //sort data alphabetically
       data.sort(function(a,b){ return d3.ascending(a[categoryHeading], b[categoryHeading])});

       //get all of the unique values in the column for the scale
       var keys = d3.map(data, function(d){ return d[categoryHeading];}).keys();

       //set domain on category
       colors.domain([0, keys.length]);

       //convert to a categorical scale
       var categoryScale = d3.scaleOrdinal(keys.map(function(d, i){ return colors(i);}));
       categoryScale.domain(keys);//set the scale domain


       //make the main chart
       g.selectAll(".square")
           .data(data)
           .enter()
           .append("rect")
           .attr("class", "square")
           .attr("x", function(d,i){ return boxSize * (i % howManyAcross); })
           .attr("y", function(d,i){ return Math.floor(i/howManyAcross) * boxSize; })
           .attr("width", boxSize - 3)
           .attr("height", boxSize - 3)
           .attr("fill", function(d){ return categoryScale(d[categoryHeading]);})
           .exit();


       //legend
       var legend = svg.selectAll(".legend")
           .data(keys)
           .enter();


       legend.append("rect")
           .attr("x", margin.left + width + boxGap )
           .attr("y", function(d,i){ return (i * boxSize) + margin.top; })
           .attr("width", boxSize - 3)
           .attr("height", boxSize - 3)
           .attr("fill", function(d){ return categoryScale(d); })

       legend.append("text")
           .attr("x", margin.left + width + boxSize + (boxGap*2))
           .attr("y", function(d,i){ return (i * boxSize) + margin.top; })
           .append("tspan")
           .attr("dx", 0)
           .attr("dy", boxSize/2)
           .style("alignment-baseline", "middle")
           .style("font-size", 10)
           .style("font-family", "Helvetica, Arial, sans-serif")
           .text(function(d){ return d;})
   });
