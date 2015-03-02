package sputnik;

import haxe.Json;
import nodejs.NodeJS;
import sputnik.radio.Radio;
import sputnik.satellite.Report;

using Lambda;

class Sputnik
{
	// http://triton.theducky.com/api/games/6129024176750592
	// https://github.com/ekimekim/neptunesfolly/blob/master/docs/api.txt

	static function main()
	{
		trace("Sputnik");

		var request:Dynamic = NodeJS.require("request");		

		var cookieJar = request.jar();
		var cookie = request.cookie('auth=');
		var url = 'http://triton.ironhelmet.com/grequest/order';
		
		cookieJar.setCookie(cookie, url);

		var form = {
			type: "order",
			order: "full_universe_report",
			version: 7,
			game_number: 6129024176750592
		};

		request.post({ url: url, jar: cookieJar, form: form }, function (b, a)
		{
			var report:Report = Report.fromDynamic(cast Json.parse(a.body).report);

			trace('Game: ${report.name}');
			trace('Player: ${report.current.name}');
		});
	}
}