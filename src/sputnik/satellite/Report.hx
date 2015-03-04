package sputnik.satellite;

using sputnik.toolbox.DynamicHammer;
using Reflect;
using Lambda;

class Report
{
	public static function fromDynamic(data:Dynamic):Report
	{
		var report = new Report();

		report.name = data.field("name");

		report.players = data.field("players").flatten().map(Player.fromDynamic);
		report.fleets = data.field("fleets").flatten().map(Fleet.fromDynamic);
		report.stars = data.field("stars").flatten().map(Star.fromDynamic);

		report.current = report.getPlayerByUid(data.field("player_uid"));

		return report;
	}

	public var name:String;

	public var current:Player;

	public var stars:Array<Star>;
	public var fleets:Array<Fleet>;
	public var players:Array<Player>;	

	public function new()
	{
	}

	public function getPlayerByName(name:String):Player
	{
		return players.find(function(player:Player):Bool
		{
			return player.name == name;
		});
	}

	public function getPlayerByUid(uid:Int)
	{
		return players.find(function(player:Player):Bool
		{
			return player.uid == uid;
		});
	}
}

class Fleet
{
	public var uid:Int;
	public var puid:Int; // player uid?
	public var l:Int;
	public var waypoint:Array<Array<Int>>;
	public var name:String; // n

	public var w:Int;
	public var x:Float;
	public var y:Float;

	public var size:Int;

	public var lx:Float;
	public var ly:Float;

	public function new()
	{

	}

	public static function fromDynamic(data:Dynamic):Fleet
	{
		var fleet = new Fleet();

		fleet.uid = data.field("uid");
		fleet.puid = data.field("puid");
		fleet.name = data.field("n");

		fleet.x = data.field("x");
		fleet.y = data.field("y");

		fleet.lx = data.field("lx");
		fleet.ly = data.field("ly");

		fleet.size = data.field("st");
		fleet.waypoint = data.field("o");
		fleet.w = data.field("w");
		fleet.l = data.field("l");

		return fleet;
	}
}


class Star
{
	public var uid:Int;
	public var puid:Int;
	public var name:String;

	public var x:Float;
	public var y:Float;

	public function new()
	{

	}

	public static function fromDynamic(data:Dynamic):Star
	{
		var star = new Star();

		star.uid = data.field("uid");
		star.puid = data.field("puid");
		star.name = data.field("n");

		star.x = data.field("x");
		star.y = data.field("y");

		return star;
	}
}