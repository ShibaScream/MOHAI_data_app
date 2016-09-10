(function(module) {
  dataHandler = {};

  dataHandler.all = [];
  dataHandler.rain = [];

  dataHandler.getAllData = function() {
    $.get('/data/all', function(data) {
      dataHandler.all = data;
    });
  };

//this does not work
  dataHandler.populateFilters = function(arr) {
      dataHandler.rain = arr.map(function(ele) {
      return ele.questiontext == 'How do you deal with the rain?';
    })
    .filter(function(question, index, arr) {
      return arr.indexOf(question) === index;
    });
  };
  //this does not work


  module.dataHandler = dataHandler;
})(window);

dataHandler.getAllData();
dataHandler.populateFilters();
