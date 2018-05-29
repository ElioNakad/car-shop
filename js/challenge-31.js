(function($) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
  var app = (function() {
    return {
      init : function() {
        console.log('App init...');
        this.loadInfo();
        this.initEvents();
      },
      loadInfo : function loadInfo() {
        console.log('Loading company info...');
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
        let $tbody = $('tbody').get();
        if (app.insertNewCar() === false) 
          return alert('Preencha corretamente todos os dados!');
        $tbody.appendChild(app.insertNewCar());
        this.reset();
      },
      initTableElements : function initTableElements() {
        let $imagem = document.createElement('img');        
        let $linha = document.createElement('tr');
        let $tdImagem = document.createElement('td');
        let $tdMarca = document.createElement('td');
        let $tdModelo = document.createElement('td');
        let $tdPlaca = document.createElement('td');
        let $tdAno = document.createElement('td');
        let $tdCor = document.createElement('td');
        let $tdRemove = document.createElement('td');
        let $btnRemove = document.createElement('button');       
        $tdRemove.appendChild($btnRemove);
        return this.appendFields($linha, $tdImagem, $imagem, $tdMarca, $tdModelo, $tdPlaca, $tdAno, $tdCor, $tdRemove);
      },
      appendFields : function appendFields(linha, tdImagem, imagem, tdMarca, tdModelo, tdPlaca, tdAno, tdCor, tdRemove) {
        tdImagem.appendChild(imagem);
        linha.appendChild(tdImagem);
        linha.appendChild(tdMarca);
        linha.appendChild(tdModelo);
        linha.appendChild(tdPlaca);
        linha.appendChild(tdAno);
        linha.appendChild(tdCor);
        linha.appendChild(tdRemove);
        return linha;
      },
      getRowNumber : function getRowNumber() {
        return $('tbody').get().children.length+1;
      },
      insertNewCar : function insertNewCar() {
        let $fragment = document.createDocumentFragment();
        let linha = this.initTableElements();  
        let $image = linha.children[0].firstElementChild;
        let $marca = linha.children[1];
        let $modelo = linha.children[2];
        let $ano = linha.children[3];
        let $placa = linha.children[4];
        let $cor = linha.children[5];
        let $tdRemove = linha.children[6];
        let $btnRemove = $tdRemove.firstElementChild;
        
        linha.id = 'linha_'+this.getRowNumber();
        $btnRemove.addEventListener('click', function(){        
          let elem = document.getElementById(linha.id);
          elem.parentNode.removeChild(elem);
        } ,false);

        $image.setAttribute('src', eval(this.getFieldValue()["imagem"]));
        $image.setAttribute('height', '80px');     
        $image.setAttribute('width', '150px');     
        $marca.textContent = eval(this.getFieldValue()["marca"]);
        $modelo.textContent = eval(this.getFieldValue()["modelo"]);
        $ano.textContent = eval(this.getFieldValue()["ano"]);
        $placa.textContent = eval(this.getFieldValue()["placa"]);
        $cor.textContent = eval(this.getFieldValue()["cor"]);
        $btnRemove.textContent = 'Remover';

        if (!this.isFieldValid($('[data-js=\"input-placa\"]').get())
           || !this.isFieldValid($('[data-js=\"input-ano\"]').get())
           || !this.isFieldValid($('[data-js=\"input-imagem\"]').get()))
            return false;
        return $fragment.appendChild(linha);
      },
      getRegexOperations : function getRegexOperations(oper) {
        switch (oper) {
          case 'url':
            return new RegExp('https?:.+', 'gm');
          case 'ano':
            return new RegExp('^\\d{4}$', 'gm');
          case 'placa':
            return new RegExp('^\\w{3}-\\d{4}$', 'gm');
        }
      },
      isFieldValid : function isFieldValid(field) {
        return this.getRegexOperations(field.name).test(field.value);
      },
      getFieldValue : function getFieldValue() {
        return {
          "imagem" : "$('[data-js=\"input-imagem\"]').get().value",
          "marca" : "$('[data-js=\"input-marca\"]').get().value",
          "modelo" : "$('[data-js=\"input-modelo\"]').get().value",
          "ano" : "$('[data-js=\"input-ano\"]').get().value",
          "placa" : "$('[data-js=\"input-placa\"]').get().value",
          "cor" : "$('[data-js=\"input-cor\"]').get().value"
        }
      }
    };
  })();

  app.init();

})(window.DOM);
