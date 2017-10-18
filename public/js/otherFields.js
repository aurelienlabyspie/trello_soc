/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

Handlebars.registerHelper('ifeq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

/**
* Aprés le chargement de l'info supp on lance l'affichage des données
*/
t.render(function(){
  t.get('board', 'shared', 'datasSpie').then(
    function(datas){
      try {
        var datasAff = JSON.parse(datas);
      } catch (e) {
        alert('Not a valid JSON');
      }
      if(datasAff){
        t.getAll('', 'shared').then(
          function(datas){
            var datasAff = JSON.parse(datas.board.shared.datasSpie);
            var datasCard = {};
            if(datas.card && datas.card.shared){
              datasCard = datas.card.shared;
            }
            $('#content').html(createRender(datasCard, datasAff));
            $('select').select2();
            t.sizeTo('#popupBody').done();
          }
        );
      }
    }
  );
});

/**
* Créaton du rendu selon les sections choisies
*/
var createRender = function(datas, datasAff){
  var html = '';
  for(var i in datasAff.clients){
    if(datasAff.clients[i].name = 'Orange'){
      var poles = datasAff.clients[i].poles;
      for(var j in poles){
        if(poles[j].value){
          t.width += 400;
          switch (poles[j].name) {
            case "T+D1" :
            break;
          case "EZAPA" :
            var ezapa = new Ezapa();
            var dataName = datasAff.clients[i].name + '_' + poles[j].name;
            if(datas[dataName]){
              var datasEzapa = JSON.parse(datas[dataName]);
            }
            html += newSection('EZAPA', ezapa.createHTML(datasEzapa), dataName);
            break;
          case "AERIEN" :
            var aerien = new Aerien();
            var dataName = datasAff.clients[i].name + '_' + poles[j].name;
            if(datas[dataName]){
              var datasAerien = JSON.parse(datas[dataName]);
            }
            html += newSection('AERIEN', aerien.createHTML(datasAerien), dataName);
            break;
          case "IPON" :
            break;
          }
        }
      }
    }
  }
  return renderAll(html);
}

/**
* lors de la cration d'une section
*/
var newSection = function(title, html, dataName){
  var template = ''
  + '<td>'
  + '<div class="panel panel-default">'
  + '  <div class="panel-heading">{{ title }}</div>'
  + '  <div class="panel-body datasSpie" style="padding: 0px;" id="{{ id }}">'
  + html
  + '  </div>'
  + '</div>'
  + '</td>';
  
  var data = {title : title,
             id : dataName
             };
  
  var handlebars = Handlebars.compile(template);
  var output = handlebars(data);
  
  return output;
}

/**
* Rendu final avec tableu des sections
*/
var renderAll = function(html){
  var template = ''
  + '<div class="container">'
  + '<table class="table">'
  + '<tr>'
  + html
  + '</tr>'
  + '</table>'
  + '</div>';
  
  var data = {html : html};
  
  var handlebars = Handlebars.compile(template);
  var output = handlebars(data);
  return output;
}

/**
* Au clic sur sauvegarder
*/
document.getElementById('save').addEventListener('click', function(){
  var category = $('.datasSpie');
  var datas = {};
  category.each(function(index){
    var category_name = $(this).attr('id');
    if(!datas[category_name]){
      datas[category_name] = {};
    }
    var datasInputs = {};
    $(this).find(':input').each(function(){
      datasInputs[$(this).attr('id')] = $(this).val();
    })
    datas[category_name] = JSON.stringify(datasInputs);
  });
  
  return t.set('card', 'shared', datas).then(function(){
    t.closePopup();
  });
  
})
