(function(module) {
  visualization = {};

  visualization.createSVG = function (selector, newID, width, height) {
    var svg = d3.select('#' + selector)
      .append('svg')
        .attr('id', newID)
        .attr('height', height)
        .attr('width', width);
  };

  visualization.ages = function() {
    var width = 500,
      height = 300;

    visualization.createSVG('age_groups', 'age_graph', width, height);

    $.get('/ages', function(data) {
      console.log(data);

      var svg = d3.select('#age_graph');

      var rects = svg.selectAll('rect')
        .data(data);

      var newRects = rects.enter();

      var maxCount = d3.max(data, function (d, i) {
        return parseInt(d.Count, 10);
      });

      // in d3 v4, it is no longer d3.scale.linear() ==> use d3.scaleLinear()
      var x = d3.scaleLinear()
        .rangeRound([0, width])
        .domain([0, maxCount]);
      // in d3 v4, it is no longer d3.scale.ordinal() ==> use d3.scaleOrdinal()
      var y = d3.scaleBand()
        .domain(data.map(function (d) { return d.answertext; }))
    	  .range([0, height])
        .paddingInner([0.1])
        .paddingOuter([0.3])
        .align([0.5]);

      newRects.append('rect')
        .attr('x', x(0))
        .attr('y', function (d, i) { return y(d.answertext); })
        .attr('height', y.bandwidth())
        .attr('width', function(d, i) {
          return x(parseInt(d.Count, 10));
        });
    });
  };

  module.visualization = visualization;

}(window));
