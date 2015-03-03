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
		report.current = report.getPlayerByUid(data.field("player_uid"));

		return report;
	}

	public var name:String;

	public var current:Player;

	public var stars:Array<Dynamic>;
	public var fleets:Array<Dynamic>;
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
	public var o:Array<Array<Int>>;
	public var o:Array<Int>;
	public var name:String; // n

	public var w:Int;
	public var x:Float;
	public var y:Float;

	public var st:Int;

	public var lx:Float;
	public var ly:Float;

	public function new()
	{

	}

	public static function fromDynamic(data:Dynamic):Fleet
	{
		var fleet = new Fleet();

		

		return fleet;
	}
}