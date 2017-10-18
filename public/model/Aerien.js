var Aerien = function()
{
  this.dateEmiIntDeploy;
  this.dateRetIntDeploy;
  this.poleTranscript;
  this.nbSupportCalcEnedis;
  this.nbSupportUsedEnedis;
  this.linearLengthComacEnedis;
  this.newPoleFT;
  this.nbExistingSupportCalcFT;
  this.nbExistingSupportUsedFT;
  this.nbExistingSupportUsedToStrengFT;
  this.nbExistingSupportUsedToRemplaceFT;
  this.nbElAerial;
  this.dateSendToSurvey;
  this.dateErdfAgreement;
  this.SendPermissionRoadPAV;
  this.AppPermissionRoadPAV;
  this.AppPruning;
  this.PruningAgreement;
  this.AppNetworkProtectionENEDIS;
  this.BPE;
  this.dateWorks;
  this.dateIponAgrement;
  
  this.html = '';
  
  this.initilized = false;
  
  this.initilized = this.__constructor();
}

Aerien.prototype.__constructor = function(){
    if(this.initilized){
      return true;
    }

    this.dateEmiIntDeploy = new TypeField('date', {id : 'dateEmiIntDeploy' , label : 'Date émission Intention déploiement (date)'});
    this.dateRetIntDeploy = new TypeField('date', {id : 'dateRetIntDeploy' , label : 'Date retour Intention déploiement (date)'});
    this.poleTranscript = new TypeField('number', {id : 'poleTranscript', label : 'relevé de poteau'});
    this.poleTranscript = new TypeField('number', {id : 'nbSupportCalcEnedis' , label : 'Nbre de supports calculés ENEDIS'});
    this.nbSupportCalcEnedis = new TypeField('number', {id : 'nbSupportUsedEnedis' , label : 'Nbre de supports utilisés (Réseau +LT) ENEDIS'});
    this.nbSupportUsedEnedis = new TypeField('number', {id : 'linearLengthComacEnedis' , label : 'Longueur mètres linéaires COMAC (colonne AQ) ENEDIS'});
    this.linearLengthComacEnedis = new TypeField('number', {id : 'newPoleFT' , label : 'Création de nouveaux poteaux FT'});
    this.newPoleFT = new TypeField('number', {id : 'nbExistingSupportCalcFT' , label : 'Nbre de supports existants calculés FT'});
    this.nbExistingSupportCalcFT = new TypeField('number', {id : 'nbExistingSupportUsedFT' , label : 'Nbre de supports existants utilisés FT'});
    this.nbExistingSupportUsedFT = new TypeField('number', {id : 'nbExistingSupportUsedToStrengFT' , label : 'Nombre de supports existants à renforcer FT'});
    this.nbExistingSupportUsedToStrengFT = new TypeField('number', {id : 'nbExistingSupportUsedToRemplaceFT' , label : 'Nombre de supports existants à remplacer FT'});
    this.nbExistingSupportUsedToRemplaceFT = new TypeField('number', {id : 'nbElAerial' , label : 'Nb EL aeriens'});
    this.nbElAerial = new TypeField('date', {id : 'dateSendToSurvey' , label : 'Envoi Etude (date)'});
    this.dateSendToSurvey = new TypeField('date', {id : 'dateErdfAgreement' , label : 'Accord ERDF (date)'});
    this.dateErdfAgreement = new TypeField('date', {id : 'SendPermissionRoadPAV' , label : 'Demande Permission voirie PAV (date)'});
    this.AppPermissionRoadPAV = new TypeField('date', {id : 'AppPermissionRoadPAV' , label : 'Accord Permission voirie PAV (date)'});
    this.AppPruning = new TypeField('date', {id : 'AppPruning' , label : 'Demande Elagage (date)'});
    this.PruningAgreement = new TypeField('date', {id : 'PruningAgreement' , label : 'Accord Elagage (date)'});
    this.AppNetworkProtectionENEDIS = new TypeField('date', {id : 'AppNetworkProtectionENEDIS' , label : 'Demande de protection réseaux ENEDIS (date)'});
    this.BPE = new TypeField('date', {id : 'BPE' , label : 'BPE'});
    this.dateWorks = new TypeField('date', {id : 'dateWorks' , label : 'Prev Fin de TRX PA '});
    this.dateIponAgrement = new TypeField('date', {id : 'dateIponAgrement' , label : 'Date réalisation IPON'});
    
    return true;
  }

Aerien.prototype.createHTML = function(datasEzapa){
  var html = '';

  var champs = [
    this.dateEmiIntDeploy,
    this.dateRetIntDeploy,
    this.poleTranscript,
    this.nbSupportCalcEnedis,
    this.nbSupportUsedEnedis,
    this.linearLengthComacEnedis,
    this.newPoleFT,
    this.nbExistingSupportCalcFT,
    this.nbExistingSupportUsedFT,
    this.nbExistingSupportUsedToStrengFT,
    this.nbExistingSupportUsedToRemplaceFT,
    this.nbElAerial,
    this.dateSendToSurvey,
    this.dateErdfAgreement,
    this.AppPermissionRoadPAV,
    this.AppPruning,
    this.PruningAgreement,
    this.AppNetworkProtectionENEDIS,
    this.BPE,
    this.dateWorks,
    this.dateIponAgrement];
  
  
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