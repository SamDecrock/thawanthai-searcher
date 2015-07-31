#!/usr/bin/env node

var httpreq = require('httpreq');
var cheerio = require('cheerio');




var id = 0;

console.log('searching...');

function getNext () {
	httpreq.get('http://www.thawanthai.be/index.php?option=com_content&task=view&id='+id, function (err, res) {
		if(err) return console.log(err);

		var $ = cheerio.load(res.body);

		var item = $('.contentheading').text().trim();
		var content = $('.MsoNormal').text().trim();

		item = item.replace(/\s\s+/g, ' ');
		item = item.replace(/�/g, '€');
		content = content.replace(/\s\s+/g, ' ');



		if(content.match(/ananas/i)  ) { // <--- SEARCH FOR ANANAS HERE
			console.log(item);
			console.log(content);
			console.log("-------------------------------------------------------");
		}

		id++;

		if(id < 160)
			getNext();
	});
}

getNext();