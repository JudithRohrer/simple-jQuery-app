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
      $.each(responseJSON.message, function (index, item) {
        var dog = {
          name: item.name
        };
        add(dog);
      });
    }).catch(function(e){
      console.error(e);
    })
  }

  function addListItem(item) {
    var $button = $('<button class="dogButton">'+ item.name +'</button>');
    var $listItem = $('<li></li>');
    $listItem.append($button);
    $dogList.append($listItem);

  }


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem
  };

})();

dogRepository.loadList().then(function() {
  dogRepository.getAll().forEach(function(dog) {
    dogRepository.addListItem(dog);
  });
});
