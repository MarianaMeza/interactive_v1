
  const margin = {top:10,right:200,bottom:30,left:100};
  const width  = 1000 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
      //boxSize = 1 // full dataset
  const boxSize = 10; //size of each box sample dataset
    //  boxGap = 0.1 // full dataset
  const boxGap = 3; //space between each box
  const howManyAcross = Math.floor(width / boxSize);

  // trying to load dataset

  const svg = d3.select("body")
        .append("svg:svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
    .append("svg:g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

        //Red and blue palette
   var colors = d3.scaleSequential(d3.interpolateYlOrRd);
   // console.log(colors.domain)
    //  var colors = d3.scaleOrdinal().range(["Red", "Maroon", "grey", "yellow", "blue"]);

    //sample
  //d3.csv('homicide_sample.csv').then(function(data, i){
  d3.json("homicide.json").then(function(data,i){
    // full
  // d3.csv('homicide_full.csv').then(function(data, i){
      // this is the variable that will make the waffles
        var categoryHeading = ["Sex", "Cause", "Location", "Age", "Education"]
         //sort data alphabetically
         var format = d3.format(",d");

         // d3.select("h2")
         //   .transition()
         //     .duration(25000)
         //     .delay(2000)
         //     .text("31,902");
             // .on("start", function repeat() {
             //   d3.active(this)
             //       .tween("text", function() {
             //         var that = d3.select(this),
             //             // i = d3.interpolateNumber(that.text().replace(/,/g, ""), Math.random() * 1e6);
             //         return function(t) { that.text(format(i(t))); };
             //       })
             //     .transition()
             //       .delay(1500)
             //       .on("start", repeat);
             // });
         //CharVis(data, categoryHeading);

         var headings =["Sex", "Cause", "Location", "Age", "Education"]
         d3.select(".buttonholder").selectAll("button")
         .data(headings)
         .enter().append("button")
         .text(function(d){return d;})
         .on("click",d => CharVis(data,d))
              });

     function CharVis (data, categoryHeading) {
      data.sort(function(a,b){ return d3.ascending(a[categoryHeading], b[categoryHeading])});
       //get all of the unique values in the column for the scale
       var keys = d3.map(data, function(d){ return d[categoryHeading];}).keys();
  //     var lines = d3.map(data, function(d){ return d.random_number;});
       //set domain on category
       colors.domain([0, keys.length]);

       //convert to a categorical scale
       var categoryScale = d3.scaleOrdinal(keys.map((d, i) => colors(i)));
       categoryScale.domain(keys);//set the scale domain

       //make the main chart
       //inspired by https://medium.freecodecamp.org/d3-and-canvas-in-3-steps-8505c8b27444
       const squares = svg.selectAll("g.square")
           .data(data)
           squares.enter()
           .append("rect")
           .attr("class", "square")
           .attr("x", function(d,i){ return boxSize * (i % howManyAcross); })
           .attr("y", function(d,i){ return Math.floor(i/howManyAcross) * boxSize; })
           // .on("mouseover", mouseover)
           // .on("mousemove", mousemove)
           // .on("mouseleave", mouseleave)
           .attr("width", boxSize - 3)
           .attr("height", boxSize - 3)
          .attr("fill", "darkgrey")
          .merge(squares)
           .transition()
           .duration(500)
           .attr("fill", function(d){ return categoryScale(d[categoryHeading]);})


// //NEED to figure this annotations
//           var myData = ['A', 'B', 'C', 'D', 'E']
//            const parag =   d3.select(".paragholder").selectAll("p")
//                   .data(keys)
//                   parag.enter()
//                   .append("p")
//                   .merge(parag)
//                   .text(function(d){
//                  //number of passengers in this group.
//                  var group_count = data.filter(function(d){if(d[keys]==d){return d}}).length;
//                  //if(key == "Cause"){
//                  //  return group_count //if no survival, show no of passengers.
//                      return parseInt(howManyAcross/data.length*100) +"%"})
//       //         .text(function(d) {return d;});
//                  parag.exit().remove();

        //  console.log(keys)
           var sequentialScale = d3.scaleOrdinal()
             .domain([...keys]) // crazy new javascript
             .range(categoryScale.range())

           svg.append("g")
             .attr("class", "legendSequential")
             .attr("transform", "translate(700,1)");

           var legendSequential = d3.legendColor()
               .shape("boxGap")
               .shapeWidth(4)
               .cells([keys])
               .orient("vertical")
               .scale(sequentialScale)
               .title([categoryHeading])
               .titleWidth(100)

           svg.select(".legendSequential")
             .call(legendSequential);





     }
