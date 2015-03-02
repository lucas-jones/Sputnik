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