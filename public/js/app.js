(function($, AJAX, COMPONENTS) {
  
  'use strict';
  
  var app = (function() {
    const $tbody = $('tbody').get();
    return {
      init : function() {                 
        this.loadInfo();               
        this.initEvents(); 
        this.refreshData();
      },
      loadInfo : function loadInfo() {  
        const URL =  "../company.json";
        AJAX.get(URL, function(data) {
          data = JSON.parse(data);          
          $('[data-js="company-name"]').get().textContent = data.name;        
          $('[data-js="company-phone"]').get().textContent = data.phone;                  
        });     
      },
      initEvents : function initEvents() {                
        const $formulario = $('form');
        $formulario.on('submit', this.handleFormSubmit);                      
      },      
      getCars : function getCars() {
        const URL = 'http://localhost:3000/car';
        AJAX.get(URL, function(data) {
          COMPONENTS.createTable(data, $tbody, app);          
        });
      },
      removeCar : function removeCar(placa) {
        const URL = 'http://localhost:3000/car';
        AJAX.remove(URL, placa, function(data){
          if (!data)
            return alert('Erro na remoção!');
          alert('Carro removido com sucesso!');
          app.refreshData();          
        });  
      },
      getPlate : function getPlate(rowNumber) {
        return $('tbody').get().children[rowNumber].childNodes[4].innerHTML;                
      },
      handleFormSubmit : function handleFormSubmit(e) {   
        e.preventDefault(); 
        const URL = 'http://localhost:3000/car';
        AJAX.post(URL, app.getCarQuery(), function(data){            
            let msg = 'Carro inserido com sucesso!';
            data = JSON.parse(data);
            if (data.hasOwnProperty('msg'))
              msg = data.msg;
            alert(msg);
            app.refreshData();
        });   
      },
      getCarQuery : function getCarQuery() {  
        let imgValue = $('[data-js="input-imagem"]').get().value;
        let marcaValue = $('[data-js="input-marca"]').get().value;
        let modeloValue = $('[data-js="input-modelo"]').get().value;
        let anoValue = $('[data-js="input-ano"]').get().value;
        let placaValue = $('[data-js="input-placa"]').get().value;
        let corValue = $('[data-js="input-cor"]').get().value;        
        return 'image='+imgValue+'&marca='+marcaValue+'&modelo='+modeloValue+'&ano='+anoValue+'&placa='+placaValue+'&cor='+corValue;
      },
      refreshData : function refreshData() {
        $tbody.innerHTML = '';
        app.getCars();
      }
    };
  })();
  
  app.init();
  
})(window.DOM, window.AJAX, window.COMPONENTS);
