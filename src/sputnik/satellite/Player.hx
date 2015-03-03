package sputnik.satellite;

using Reflect;

class TechStats
{
	public var value:Float;
	public var level:Int;

	public static function fromDynamic(data:Dynamic):TechStats
	{
		var techStats = new TechStats();

		techStats.value = data.field("value");
		techStats.level = data.field("level");

		return techStats;
	}

	public function new()
	{

	}
}

class Technology
{
	public var scanning:TechStats;
	public var propulsion:TechStats;
	public var terraforming:TechStats;
	public var research:TechStats;
	public var weapons:TechStats;
	public var banking:TechStats;
	public var manufacturing:TechStats;

	public static function fromDynamic(data:Dynamic):Technology
	{
		var technology = new Technology();

		technology.scanning = TechStats.fromDynamic(data.field("scanning"));
		technology.propulsion = TechStats.fromDynamic(data.field("propulsion"));
		technology.terraforming = TechStats.fromDynamic(data.field("terraforming"));
		technology.research = TechStats.fromDynamic(data.field("research"));
		technology.weapons = TechStats.fromDynamic(data.field("weapons"));
		technology.banking = TechStats.fromDynamic(data.field("banking"));
		technology.manufacturing = TechStats.fromDynamic(data.field("manufacturing"));

		return technology;
	}	

	public function new()
	{

	}
}

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

	public var technology:Technology;

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

		player.technology = Technology.fromDynamic(data.field("tech"));

		return player;
	}

	public function new()
	{

	}
}