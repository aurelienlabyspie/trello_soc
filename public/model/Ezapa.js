var Ezapa = function()
{
  this.nbElPav = '';
  this.nbElPbChSout;
  this.nbElPbChAerien;
  this.nbElAerien;
  this.nbElPbFacadeAeroSout;
  this.nbElPbFacadeAerien;
  this.techBe;
  this.correcteur;
  this.typePa;
  this.typologiePa;
  this.avancementBePa;
  this.semainePrev;
  this.dateValidEzapa;
  this.demandeCms;
  this.traiteCms;
  
  this.html = '';
  
  this.initilized = false;
  
  this.initilized = this.__constructor();
}

Ezapa.prototype.__constructor = function(){
    if(this.initilized){
      return true;
    }
    
    var that = this;
    
    var listTechBe = [
      'GVE',
      'TBA',
      'CFA',
      'CBE',
      'VPR',
      'CFL',
      'JPD',
      'EMJ',
      'BCO',
      'AIR',
      'ETA',
      'BETI',
      'CIRNT',
      'SYSCOM',
      'PLANET',
      'BES',
      'EARF'
    ];
    
    var listCorrecteurBe = [
      'GVE',
      'TBA',
      'CFA',
      'CBE',
      'VPR',
      'CFL',
      'JPD',
      'EMJ',
      'BCO'
    ];
    
    var listTypePa = [
      'Mixte',
      'Pavillonnaire',
      'Light',
      'Dedié'
    ];
    
    var listTypologiePa = [
      /*'Aérien',
      'Aéro-Sout',
      'Sousterrain'*/
      'Souterrain',
      'Aérien FT',
      'Aérien ENEDIS',
      'Aérien Mixte',
      'Aérien + Sout. FT',
      'Aérien + Sout. ENEDIS',
      'Aérien + Sout. Mixte',
      'Façade'
    ];
    
    var listAvancementBePa = [
      'En cours',
      'Réalisé',
      'Attente VT',
      'Bloqué',
      'SO'
    ];
    
    this.nbElPav = new TypeField('number', {id : "nbElPav", label : "nombre d'EL PAV"});
    this.nbElPbChSout  = new TypeField('number', {id : "nbElPbChSout", label : "nombre d'EL PB ch. \"sout\""});
    this.nbElPbChAerien  = new TypeField('number', {id : "nbElPbChAerien", label : "nombre d'EL PB ch. \"aérien\""});
    this.nbElAerien  = new TypeField('number', {id : "nbElAerien", label : "nombre d'EL Aérien"});
    this.nbElPbFacadeAeroSout  = new TypeField('number', {id : "nbElPbFacadeAeroSout", label : "nombre d'EL PB Façade \"aéro-sout\""});
    this.nbElPbFacadeAerien  = new TypeField('number', {id : "nbElPbFacadeAerien", label : "nombre d'EL PB Façade \"aérien\""});
    this.techBe = new TypeField('select', {id : 'techBe', label : 'Technicien BE', list : listTechBe});
    this.correcteur = new TypeField('select', {id : 'correcteur', label : 'Correcteur', list : listCorrecteurBe});
    this.typePa = new TypeField('select', {id : 'typePa', label : 'Type PA', list : listTypePa});
    this.typologiePa = new TypeField('select', {id : 'typologiePa', label : 'Typologie PA', list : listTypologiePa});
    this.avancementBePa = new TypeField('select', {id : 'avancementBePa', label : 'Avancement. BE du PA', list : listAvancementBePa});
    this.semainePrev = new TypeField('week', {id : 'semainePrev', label : 'Semaine prévisonnelle'});
    this.dateValidEzapa = new TypeField('date', {id : 'dateValidEzapa', label : 'EZAPA VALIDE'});
    this.demandeCms = new TypeField('week', {id : 'demandeCms', label : 'Demande CMS'});
    this.traiteCms = new TypeField('week', {id : 'traiteCms', label : 'CMS traité'});
    
    return true;
  }

Ezapa.prototype.createHTML = function(datasEzapa){
  var html = '';

  var champs = [
    this.nbElPav,
    this.nbElPbChSout,
    this.nbElPbChAerien,
    this.nbElAerien,
    this.nbElPbFacadeAeroSout,
    this.nbElPbFacadeAerien,
    this.techBe,
    this.correcteur,
    this.typePa,
    this.typologiePa,
    this.avancementBePa,
    this.semainePrev,
    this.dateValidEzapa,
    this.demandeCms,
    this.traiteCms];
  
  
  for(var i in champs){
    if(champs[i].html == ''){
      if(datasEzapa && datasEzapa[champs[i].option.id]){
        console.log(datasEzapa[champs[i].option.id]);
        champs[i].val(datasEzapa[champs[i].option.id]);
      }else{
        champs[i].val(champs[i].value);
      }
    }
    html += champs[i].html;
  }

  this.html = html;
  return html;
}