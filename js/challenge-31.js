(function($) {
  
  'use strict';
  
  var app = (function() {
    return {
      init : function() {               
        this.loadInfo();        
        this.getCars();        
        this.initEvents(); 
      },      
      getCars : function getCars() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/car', true);
        ajax.send();        
        ajax.addEventListener('readystatechange', this.getAllCars, false);
      },
      getAllCars : function getAllCars() {  
        if (!app.isReady.call(this))
          return;                           
          let data = JSON.parse(this.responseText); 
          let $tbody = $('tbody').get();          
          let $fragment = document.createDocumentFragment();       
          for(let item in data) {                 
            let $tr = document.createElement('tr');
            let $image = document.createElement('img');
            let $tdImage = document.createElement('td');
            let $tdMarca = document.createElement('td');
            let $tdModelo = document.createElement('td');
            let $tdAno = document.createElement('td');
            let $tdPlaca = document.createElement('td');
            let $tdCor = document.createElement('td');
            let $tdRemove = document.createElement('td');            
            let $imgRemove = document.createElement('img');

            $imgRemove.setAttribute('src', '../img/button-remove.png');
            $imgRemove.classList.add('button-remove');          
            $imgRemove.addEventListener('click', function(){        
              let elem = document.getElementById($tr.id);
              elem.parentNode.removeChild(elem);
            } ,false);
            $tdRemove.appendChild($imgRemove);
            $tr.id = 'row_'+app.getCurrentRowNumber();                                                
            $tdImage.appendChild($image);
            $image.classList.add('car-image');
            $image.setAttribute('src', data[item].imagem);
            $tdMarca.textContent = data[item].marca;
            $tdModelo.textContent = data[item].modelo;
            $tdAno.textContent = data[item].ano;
            $tdPlaca.textContent = data[item].placa;
            $tdCor.textContent = data[item].cor;
            
            $tr.appendChild($tdImage);
            $tr.appendChild($tdMarca);
            $tr.appendChild($tdModelo);
            $tr.appendChild($tdAno);
            $tr.appendChild($tdPlaca);
            $tr.appendChild($tdCor);
            $tr.appendChild($tdRemove);            
            $fragment.appendChild($tr);                                                       
          }        
          return $tbody.appendChild($fragment);
                
      },            
      loadInfo : function loadInfo() {       
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },
      getCompanyInfo : function getCompanyInfo() {
        if (!app.isReady.call(this))
          return;
        let data = JSON.parse(this.responseText);
        const $infoCompany = $('[data-js="company-name"]').get();
        const $infoPhone = $('[data-js="company-phone"]').get();
        $infoCompany.textContent = data.name;
        $infoPhone.textContent = data.phone;      
      },
      isReady : function isReady() {
        return this.readyState === 4 && this.status === 200;
      },
      initEvents : function initEvents() {                
        const $formulario = $('form');
        $formulario.on('submit', this.handleFormSubmit);                           
      },
      handleFormSubmit : function handleFormSubmit(e) {       
        e.preventDefault();                 
        var ajax = new XMLHttpRequest();        
        ajax.open('POST', 'http://localhost:3000/car');        
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.send(app.getCarQuery());                                 
        let $tbody = $('tbody').get();
        let msg = 'Carro inserido com sucesso!';
        ajax.addEventListener('readystatechange', function(){          
          if (this.readyState === 4 && this.status === 200){  
            var response = JSON.parse(ajax.responseText);
            if (response.hasOwnProperty('msg'))  
              msg = response.msg;                        
            $tbody.innerHTML = '';            
            alert(msg);
            app.getCars();                                                                                                                                         
          }        
        }, false);        
      },
      getCurrentRowNumber : function getCurrentRowNumber() {
        return $('tbody').get().children.length+1;
      },
      getCarQuery : function getCarQuery() {  
        let imgValue = $('[data-js="input-imagem"]').get().value;
        let marcaValue = $('[data-js="input-marca"]').get().value;
        let modeloValue = $('[data-js="input-modelo"]').get().value;
        let anoValue = $('[data-js="input-ano"]').get().value;
        let placaValue = $('[data-js="input-placa"]').get().value;
        let corValue = $('[data-js="input-cor"]').get().value;        
        return 'image='+imgValue+'&marca='+marcaValue+'&modelo='+modeloValue+'&ano='+anoValue+'&placa='+placaValue+'&cor='+corValue;
      }
    };
  })();
  
  app.init();
  
})(window.DOM);
