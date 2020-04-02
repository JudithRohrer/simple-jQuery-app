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

  //creates a button for every dog added to the dogRepository
  function addListItem(dog) {
    var $button = $('<button class="pokeButton">' + dog.name + '</button>');
    var $listItem = $('<li></li>');
    $listItem.append($button);
    $dogList.append($listItem);
    //shows details when button is clicked
    $button.on('click',function(){
      showDetails(dog);
    });
  }

  function showDetails(item) {
    loadDetails(item).then(function(){
      showModal(item);
    });
  }

  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function (responseJSON) {
      json.results.forEach(function(responseJSON){
        var dog = {
          name: item.message,
          deatialsUrl: item.url
        };
        add(dog);
      });
    }).catch(function(e) {
       console.error(e);
    });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url, {dataType: 'json'}).then(function (details){
      item.imageUrl = details.sprites.front_default;

  })
  .catch(function(e){
    console.error(e);
    })
  }

function showModal(item) {
  $modalContainer.empty();

  var $modal = $('<div class="modal"></div>')
  var $closeButtonElement = $('<button class="modal-close">Close</button>');
  $('.modal-close').on('click', hideModal);

  var $titleELement = $('<h1> item.name </h1>');
  var $imgElement = $('<img src="item.imageUrl">');

  $modalContainer.append($titleElement);
  $modalContainer.append($imgElement);

  $modalContainer.classList.add('is-visible');
}

function hideModal () {
  $modalContainer.classList.remove('is-visible');
}
  $('window').on('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')){
      hideModal();
    }
});
    $modalContainer.on('click',(e) => {
    var target = e.target;
    if(target === $modalContainer){
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };

})();

dogRepository.loadList().then(function() {
  dogRepository.getAll().forEach(function(dog) {
    dogRepository.addListItem(dog);
  });
});
