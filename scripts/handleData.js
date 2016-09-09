(function(module) {
  dataHandler = {};

  dataHandler.populateFilters = function() {
    $.get('/ages', function(data) {
        var optionTag = '<option value="' + data[0].polltext + '">' + data[0].polltext + '</option>';
        $('#question_selection').append(optionTag);
    });
  };

  dataHandler.displayGraph = function() {
    $('#question_selection').on('change', function() {

  });
};

  module.dataHandler = dataHandler;
})(window);


dataHandler.populateFilters();
