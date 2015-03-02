package sputnik;

import haxe.Json;
import nodejs.NodeJS;
import sputnik.radio.Radio;

class App
{
	static function main()
	{
		trace("Sputnik: Hello");

		// http://triton.theducky.com/api/games/6129024176750592
		// https://github.com/ekimekim/neptunesfolly/blob/master/docs/api.txt

		//Radio.transmit("Hello World!");

		var request:Dynamic = NodeJS.require("request");		

		var j = request.jar();
		var cookie = request.cookie('auth=');
		var url = 'http://triton.ironhelmet.com/grequest/order';
		j.setCookie(cookie, url);

		var form = {
			type: "order",
			order: "full_universe_report",
			version: 7,
			game_number: 6129024176750592
		};

		request.post({ url: url, jar: j, form: form }, function (b ,a ) {
		  var obj = Json.parse(a.body);
		  trace(Json.stringify(obj, null, '\t'));
		});

		
		//curl 'http://triton.ironhelmet.com/grequest/order' --data 'type=order&order=full_universe_report&version=7&game_number=6129024176750592' --cookie "auth=eyJfdXNlciI6WyJVU1oxQlhEQ1lYSUpFQUJJTTIzVjMiLDEsIjdoT0NVVzBLbTNvcnNCUXpYSGN0TEUiLDE0MjUzMjAxNzgsMTQyNTMyMDE3OF19|1425320182|6776b8f214dbdd6946cecccdc9da8ef6e615e5ba"	
	}
}