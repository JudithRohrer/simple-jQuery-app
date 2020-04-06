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
    var $button = $('<button class="dogButton">'+ dog.name +'</button>');
    var $listItem = $('<li></li>');
    $listItem.append($button);
    $dogList.append($listItem);
    $button.on('click', function(event){
      showModal(dog);
    });
  }


  function showModal(dog){
    $modalContainer.empty();

    var $modal = $('<div class="modal"></div>');
    var $closeButtonElement = $('<button class="modal-close">Close</button>');
    $closeButtonElement.on ('click', hideModal);

    var $titleElement = $('<h1>'+dog.name+'</h1>');

    var dogUrl = 'https://dog.ceo/api/breed/'+dog.name+'/images/random';
    $.ajax(dogUrl, {dataType: 'json'}).then(function (responseJSON){
      var $breedsImage = $('<img class="modal-image" src="' + responseJSON.message + '">');
      $modal.append($breedsImage);
    }).catch(function(e){
      console.error(e);
    })

    $modal.append($titleElement);
    $modal.append($closeButtonElement);
    $modalContainer.append($modal);
    $modalContainer.addClass('is-visible');
  }

  function hideModal () {
    $modalContainer.removeClass('is-visible');
  }

  $(window).on('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')){
      hideModal();
    }
  });

  $modalContainer.on('click',(e) => {
    var target = e.target;
    if(target !== $modalContainer){
      hideModal();
      }
    });


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    showModal: showModal,
    hideModal: hideModal
  };

})();

dogRepository.loadList().then(function() {
  dogRepository.getAll().forEach(function(dog) {
    dogRepository.addListItem(dog);
  });
});
