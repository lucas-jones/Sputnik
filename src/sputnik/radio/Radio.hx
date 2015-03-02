package sputnik.radio;

import nodejs.NodeJS;

class Radio 
{
	public static inline var TITLE:String = "Sputnik";

	public static inline var USER:String = "uY75q8nxUVLxSD8TacaeUfXZZ4XrLg";
	public static inline var TOKEN:String = "aExkVfyovoF4BSjCzTG6h9vD9aGKmQ";

	public static function transmit(message:String):Void
	{
		var pushover:Dynamic = NodeJS.require("pushover.net");

		pushover({
			user: USER,
			token: TOKEN,
			title: TITLE,
			message: message,
			priority: 1
		}).end();
	}
}