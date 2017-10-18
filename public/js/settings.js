/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var templateEntry = document.getElementById('entry-template');
var template = templateEntry.innerHTML;
var content = document.getElementById('content');

var promisePluginDatas = [];
var pluginDatas = [];

/*
* datasBE : modéle de données de l'organisation des settings du BE
*/
var datasBE =
  {
    be : "Spie OC",
    clients : [
      {
       name : "Orange",
       poles :[ 
        { name : "T+D1" },
        { name : "EZAPA" },
        { name : "AERIEN" },
        { name : "IPON" }
       ]
      }
    ]
  };

/*
* Récupération de la data stocké dans le board Trello
*/
t.get('board', 'shared', 'datasSpie').then(
  function(datas){
    try {
      var jDatas = JSON.parse(datas);
      console.log(jDatas);
    } catch (e) {
      console.log('Not a valid JSON');
    }
    
    if(jDatas){
      for(var i in jDatas.clients){
        var client = jDatas.clients[i];
        for(var j in client.poles){
          var pole = client.poles[j];
          $('[data-client="'+client.name+'"][data-pole="'+pole.name+'"]').prop('checked', pole.value);
        }
      }
    }
  }
);

/*
* Validation du formulaire + enregistrement dans le board Trello
*/
$('#btnValid').click(function(){
  saveDatas(datasBE).then(
    function(){
      t.closePopup();
    }
  );
});

/*
* Sauvegarde des données Spie
* @param Object dataBE modele de données à sauvagarder
*/
function saveDatas(datasBE){
  return new Promise(function(resolve, reject){
    for(var i in datasBE.clients){
      var client = datasBE.clients[i];
      for(var j in client.poles){
        var pole = client.poles[j];
        console.log(client.name, pole.name,$('[data-client="'+client.name+'"][data-pole="'+pole.name+'"]').prop('checked'));
        pole.value = $('[data-client="'+client.name+'"][data-pole="'+pole.name+'"]').prop('checked');
      }
    }
    t.set('board', 'shared', 'datasSpie', JSON.stringify(datasBE)).then(
      function(data){
        resolve(data);
      }
    );  
  })
}

/*
* moteur de templation Handlebars
*/
var handlebars = Handlebars.compile(template);
var output = handlebars(datasBE);
content.innerHTML = output;