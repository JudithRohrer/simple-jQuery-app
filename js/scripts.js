var dogRepository = (function (){
  var repository = [];
  var apiUrl = 'https://dog.ceo/api/breeds/list/all';
  var $dogList = $('#dog-list');
  var $modalContainer = $('#modal-container');

  //ensures correct data input of repository
  function add(breeds) {
    repository.push(breeds);
  }

  function getAll() {
    return repository;
  }

  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function (responseJSON) {
      console.log(responseJSON);
      console.log(responseJSON.message);
      for (item in responseJSON.message){
        console.log(item);
      }
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList
  };

})();

dogRepository.loadList().then(function() {
  dogRepository.getAll().forEach(function(dog) {
    dogRepository.addListItem(dog);
  });
});
