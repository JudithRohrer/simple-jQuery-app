var dogRepository = (function (){
  var repository = [];
  var apiUrl = 'https://dog.ceo/api/breeds/list/all';
  var $dogList = $('#dog-list');

  //ensures correct data input of repository
  function add(breeds) {
    repository.push(breeds);
  }

  function getAll() {
    return repository;
  }

  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function (responseJSON) {
      $.each(responseJSON.message, function (key, value) {
        var dog = {
          name: (key)
        };
        add(dog);
      });
    }).catch(function(e){
      console.error(e);
    })
  }

  function addListItem(dog) {
    var $button = $('<button type="button" class="btn btn-outline-dark btn-block list-group-item" data-toggle="modal" data-target="#modalCenter">'
      + dog.name +'</button>');
    $dogList.append($button);
    $button.on('click', function(event){
      fetchDogImage(dog);
    });
  }

  function fetchDogImage(dog) {
    var modalTitle = $("#modalTitle");
    var modalBody = $(".modalBody");

    modalTitle.empty();
    modalBody.empty();

    var $nameElement = $('<h5>'+dog.name+'</h5>');

    var dogUrl = 'https://dog.ceo/api/breed/'+dog.name+'/images/random';
    $.ajax(dogUrl, {dataType: 'json'}).then(function (responseJSON){
      var $breedsImage = $('<img class="modal-image" src="' + responseJSON.message + '">');
      modalBody.append($breedsImage);
    }).catch(function(e){
      console.error(e);
    })

    modalTitle.append($nameElement);

  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    fetchDogImage: fetchDogImage
  };

})();

dogRepository.loadList().then(function() {
  dogRepository.getAll().forEach(function(dog) {
    dogRepository.addListItem(dog);
  });
});
