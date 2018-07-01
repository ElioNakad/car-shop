(function() {

    'use strict';

    const AJAX = (function() {
        return {
            get : function get(url, callback) {
                const ajax = new XMLHttpRequest();
                ajax.open('GET', url, true);
                ajax.send();
                ajax.addEventListener('readystatechange', function(){
                    if (ajax.status === 200 && ajax.readyState === 4)
                        return callback(ajax.responseText);
                }, false);
            },
            post : function post(url, sendItem, callback) {
                const ajax = new XMLHttpRequest();
                ajax.open('POST', url, true);
                ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                ajax.send(sendItem);
                ajax.addEventListener('readystatechange', function(){
                    if (ajax.status === 200 && ajax.readyState === 4)
                        return callback(ajax.responseText);
                }, false);
            },
            remove : function remove(url, plate, callback) {
                const ajax = new XMLHttpRequest();
                ajax.open('DELETE', url, true);
                ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                ajax.send('placa='+plate);
                ajax.addEventListener('readystatechange', function(){
                    if (ajax.status === 200 && ajax.readyState === 4)
                        return callback(ajax.responseText);
                }, false);
            }
        };
    })();
window.AJAX = AJAX;
})();