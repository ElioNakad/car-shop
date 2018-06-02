'use strict';

var express = require('express');
var router = express.Router();
var data = [];

function isValid(operator, value) {  
  return getRegexOperations(operator).test(value);
}

function getRegexOperations(oper) {
  switch (oper) {
    case 'imagem':
      return new RegExp('https?:.+', 'gm');
    case 'ano':
      return new RegExp('^\\d{4}$', 'gm');
    case 'placa':
      return new RegExp('^\\w{3}-\\d{4}$', 'gm');
  }
}

router.get('/', function(req, res) {  // /car (get)
  res.json(data);
});

router.delete('/', function(req, res) {
  var placa = req.body.placa;

  data = data.filter(function(car) {
    return car.placa !== placa;
  });
  console.log('NewData => ', data);
  res.json(data);
});

router.post('/', function(req, res) { // /car (post)
  var imagem = req.body.image;
  var marca = req.body.marca;
  var modelo = req.body.modelo;
  var ano = req.body.ano;
  var placa = req.body.placa;
  var cor = req.body.cor;
  
  if ((!isValid('ano', ano)) || (!isValid('imagem', imagem)) || (!isValid('placa', placa)))
    return res.json({msg: "Dados inválidos. Preencha novamente!"});

  var hasCar = data.some(function(car) {
    return car.placa === placa;
  });

  if(!hasCar) {
    data.push({
      imagem: imagem,
      marca: marca,
      modelo: modelo,
      ano: ano,
      placa: placa,
      cor: cor 
    });
    return res.json(data);
  } 
  return res.json({msg : "Carro com a placa " + placa + " já cadastrado!"}); 
});

module.exports = router;
