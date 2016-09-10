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

  var propertyMatch = function(arr, property, obj) {

  };

  dataHandler.init = function() {
    $.get('/data/all', function(data) {
      console.log('getting data');
      // console.log(data);
      dataHandler.all = data;
      dataHandler.populateQuestions(dataHandler.all);
    });
  };

  dataHandler.populateQuestions = function(data) {
    var property = 'questiontext';
    var uniquestions = data
      .filter(function(obj, i, arr) {
        return indexOfObject(arr, property, obj) === i;
      }, [])
      .map(function(obj){
        return obj[property]
      });

      uniquestions.forEach(function(ele) {
        var optionTag = '<option value="' + ele + '">' + ele + '</option>';
        $('#question_selection').append(optionTag);
      });
    };


    dataHandler.populateGraphs = function(data) {
      $('#question_selection').on('change', function(data) {
       return $(this).value();
      });
      // var property = 'questiontext';
      //
      //   .filter(function(arr, property, obj) {
      //     return propertyMatch(arr, property, obj);
      //   }, [])
      // });
      // console.log($(this).val());
    };


  dataHandler.init();
  dataHandler.populateGraphs();

  module.dataHandler = dataHandler;
})(window);
