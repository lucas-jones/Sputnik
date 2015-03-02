package sputnik;

import sputnik.radio.Radio;

class App
{
	static function main()
	{
		trace("Sputnik: Hello");

		// http://triton.theducky.com/api/games/6129024176750592
		// https://github.com/ekimekim/neptunesfolly/blob/master/docs/api.txt

		Radio.transmit("Hello World!");
	}
}