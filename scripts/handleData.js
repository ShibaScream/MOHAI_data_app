(function(module) {
  dataHandler = {};

  dataHandler.all = [];

  // private function to check index for de-duping data
  var indexOfObject = function(arr, propCheck, obj) {
    for (var i = 0; i < arr.length; i++) {
      // console.log(obj[propCheck]);
      if (arr[i][propCheck] === obj[propCheck]) {
        return i;
      }
    }
    return -1;
  };

  dataHandler.init = function() {
    $.get('/data/all', function(data) {
      console.log('getting data');
      // console.log(data);
      dataHandler.all = data;
      dataHandler.populateQuestions(dataHandler.all);
    }).then(function() {
      $('#question_selection').on('change',function() {
        if ($(this).val() === '') {
          $('#visual_data').hide();
        } else {
          $('#visual_data').empty().show();
          visualization.verticalBarChart((dataHandler.filterData($(this).val())), '#visual_data');
        }
      });
    });
  };

  dataHandler.populateQuestions = function(data) {
    var property = 'questiontext';
    var uniquestions = data
      .filter(function(obj, i, arr) {
        return indexOfObject(arr, property, obj) === i;
      }, [])
      .map(function(obj){
        return obj[property];
      });
    uniquestions.forEach(function(ele) {
      var optionTag = '<option value="' + ele + '">' + ele + '</option>';
      $('#question_selection').append(optionTag);
    });
  };

  dataHandler.filterData = function(option) {
    var results = dataHandler.all.filter(function(obj){
      return obj.questiontext === option;
    });
    return results;
  };

  dataHandler.init();

  module.dataHandler = dataHandler;
})(window);
