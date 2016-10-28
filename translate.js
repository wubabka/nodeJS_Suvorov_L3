'use strict';

var http = require('http');
var url = require('url');
var request = require('request');

var key = 'trnsl.1.1.20161028T074855Z.3acd581d64ec49ab.1253711d6a25f3e7558b196b70eb09cff90cb8f4';

http.createServer(function(req, res)  {
    var params = url.parse(`http://${req.headers.host}${req.url}`, true);
    var data = params.path.slice(1) || '';

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

    if (data) {
        request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&lang=en-ru&text=${data}`, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                let translation = JSON.parse(body).text;
                res.write('<p>Введите в строку поиска любое английское слово (Например: http://localhost:8080/Hello my dear friend!)</p>');
                res.write(`<p>Английский: ${data}</p><p>Русский: ${translation}</p>`);
                res.end();
            }
        });
    }
    
}).listen('8080');

console.log('Сервер запущен на 8080 порту.');
