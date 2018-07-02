(function() {

'use strict';

const COMPONENTS = (function() {
    return {
        createTable : function createTable(data, $tbody, app) {
            data = JSON.parse(data);
            const $fragment = document.createDocumentFragment(); 
            let counter = 0;            
            for(const item in data) {
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
                    app.removeCar(app.getPlate(this.id));
                }, false);
                $tdRemove.appendChild($imgRemove);
                $imgRemove.id = counter;
                $tr.id = 'row_'+counter;                                               
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
                counter++;                        
            }
            $tbody.appendChild($fragment);
        }
    };
})();
window.COMPONENTS = COMPONENTS;
})();