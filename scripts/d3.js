(function(module) {
  visualization = {};

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select('#age_groups')
  .append('div')
  .classed('svg-container', true)
  .append('svg')
  .attr('preserveAspectRatio', 'xMinYMin meet')
  .attr('viewBox', '-40 20 900 450')
  .classed('svg-content-responsive', true);

  //     .attr('width', width + margin.left + margin.right)
  //     .attr('height', height + margin.top + margin.bottom)
  //   .append('g')
  //     .attr('transform',
  //           'translate(' + margin.left + ',' + margin.top + ')');
  //
  // // get the data
  $.get('/ages', function(data) {
    // if (error) throw error;

    // format the data
    data.forEach(function(d) {
      d.Count = +d.Count;
      console.log(d.Count);
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.answertext; }));
    y.domain([0, d3.max(data, function(d) { return d.Count; })]);

    // append the rectangles for the bar chart
    svg.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.answertext); })
        .attr('width', x.bandwidth())
        .attr('y', function(d) { return y(d.Count); })
        .attr('height', function(d) { return height - y(d.Count); });

    // add the x Axis
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append('g')
        .call(d3.axisLeft(y));

  });


//   visualization.createSVG = function (selector, newID, width, height) {
//     var svg = d3.select('#' + selector)
//       .append('svg')
//         .attr('id', newID)
//         .attr('viewBox', '0 0 ' + width + ' ' + height )
//         .attr('preserveAspectRatio', 'xMidYMid meet');
//   };
//
//   visualization.ages = function() {
//     var width = 800,
//       height = .2 * width;
//
// //appends a blank graph to the existing whenever data tab is clicked
//     visualization.createSVG('age_groups', 'age_graph', width, height);
//
//     $.get('/ages', function(data) {
//       console.log(data);
//
//       var svg = d3.select('#age_graph');
//
//       var rects = svg.selectAll('rect')
//         .data(data);
//
//       var newRects = rects.enter();
//
//       var maxCount = d3.max(data, function (d, i) {
//         return +d.Count;
//       });
//
//       // in d3 v4, it is no longer d3.scale.linear() ==> use d3.scaleLinear()
//       var x = d3.scaleLinear()
//         .rangeRound([0, width])
//         .domain([0, maxCount]);
//       // in d3 v4, it is no longer d3.scale.ordinal() ==> use d3.scaleOrdinal()
//       var y = d3.scaleBand()
//         .domain(data.map(function (d) { return d.answertext; }))
//     	  .range([0, height])
//         .paddingInner([0.1])
//         .paddingOuter([0.3])
//         .align([0.5]);
//
//       newRects.append('rect')
//         .attr('x', x(0))
//         .attr('y', function(d, i) {return y(d.answertext)})
//         .attr('height', y.bandwidth())
//         .attr('width', function(d, i) {
//           return x(+d.Count, 10);
//         });
//     });
//   };

  module.visualization = visualization;

}(window));
