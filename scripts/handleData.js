(function(module) {
  dataHandler = {};

  dataHandler.populateFilters = function() {
    $.get('/ages', function(data) {
        var optionTag = '<option value="' + data[0].questiontext + '">' + data[0].questiontext + '</option>';
        $('#question_selection').append(optionTag);
        console.log(data);
    });
    //look thru server requests and append str value to option tags
    $.get('/data/why_come', function(data) {
        console.log(data);
    });
  };

  dataHandler.displayGraph = function() {
    $('#question_selection').on('change', function() {
      if ($(this).val() === 'Age') {
        $.get('/ages', function(data) {
          visualization.verticalBarChart(data);
          console.log('inside display graph');
        });
      } else if {
        //continue long if/else blocks
      }
      // $('#visual_data_representation')
  });
};

  module.dataHandler = dataHandler;
})(window);


dataHandler.populateFilters();
dataHandler.displayGraph();
