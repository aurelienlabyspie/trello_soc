var TypeField = function(type, option, value){
  this.type = type;
  this.option = option;
  if(value){
    this.value = value;  
  }else{
    this.value = '';
  }
  
  this.html = '';
  
  this.initilized = false;
  
  function __constructor(){
    if(this.initilized){
      return true;
    }
    
    //this.createHTML();
    initilized = true;

  }
  
  this.initilized = __constructor();
}


TypeField.prototype.createHTML = function(){
  if(this.option.id && this.option.label){
    var data = {
      id : this.option.id,
      label : this.option.label,
      type : this.type,
      list : this.option.list,
      value : this.value
    };

    switch(this.type){
      case "text" :
      case "number" :
      case "date" :
      case "week" :
        this.html = this.htmlInput(data);
        break;
      case "select" :
        this.html = this.htmlSelect(data);
        break;
    }

  }else{
    alert('ERROR : typeField mal construit!')
  }
}

TypeField.prototype.htmlInput = function(data){
  
  var template = ''
  + '<div class="form-group">'
  + '  <label for="{{ id }}" class="col-sm-2 control-label">{{ label }}</label>'
  + '  <div class="col-sm-10">'
  + '    <input type="{{ type }}" class="form-control" id="{{ id }}" placeholder="{{ label }}" name="{{ id }}" value="{{ value }}">'
  + '  </div>'
  + '</div>';
  
  var output = this.returnHTML(template, data);
  
  return output;
}

TypeField.prototype.htmlSelect = function(data){
  
  var template = ''
  + '<div class="form-group">'
  + '  <label for="{{ id }}" class="col-sm-2 control-label">{{ label }}</label>'
  + '  <div class="col-sm-10">'
  + '  <select id="{{ id }}" class="form-control" value="{{ value }}">'
  + '    {{#ifeq value "" }}<option selected  disabled> -- Choisir une option -- </option>{{/ifeq}}'
  + '    {{#each list}}'
  + '    <option value="{{ this }}" {{#ifeq this ../value }} selected {{/ifeq}}>{{ this }}</option>'
  + '    {{/each}}'
  + '  </select>'
  + '  </div>'
  + '</div>';
  
  var output = this.returnHTML(template, data);
  
  return output;
}

TypeField.prototype.val = function(value){
  this.value = value;
  this.createHTML();
}

TypeField.prototype.returnHTML = function(template, data){
  var handlebars = Handlebars.compile(template);
  var output = handlebars(data);
  return output;
}