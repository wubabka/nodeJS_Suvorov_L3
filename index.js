'use strict'

var request = require('request');
var cheerio = require('cheerio');

request('https://css-tricks.com/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var arr = [];
        $('.article-card').each(function () {
            var post = {};
            post.date = $(this).find(".bar-time").text();
            post.title = $(this).find(".read-article").text();
            post.author = $(this).find(".author-byline").text();
            post.content = $(this).find(".text-block").text();
            arr.push(post);
        });
        
        for (var post of arr) {
            console.log(`Дата: ${post.date}\nЗаголовок: ${post.title}\nАвтор: ${post.author}\nСодержание: ${post.content.trim()}\n`);
        }
    }
});