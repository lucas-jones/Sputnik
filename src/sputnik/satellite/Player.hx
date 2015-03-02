package sputnik.satellite;

using Reflect;

class Player
{
	public var uid:Int;
	public var name:String;

	public var stars:Int;
	public var fleets:Int;
	public var strength:Int;

	public var industry:Int;
	public var science:Int;
	public var economy:Int;

	public static function fromDynamic(data:Dynamic):Player
	{
		var player = new Player();

		player.uid = data.field("uid");
		player.name = data.field("alias");

		player.stars = data.field("total_stars");
		player.fleets = data.field("total_fleets");
		player.strength = data.field("total_strength");

		player.industry = data.field("total_industry");
		player.science = data.field("total_science");
		player.economy = data.field("total_economy");

		return player;
	}

	public function new()
	{

	}
}