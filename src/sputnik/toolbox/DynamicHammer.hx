package sputnik.toolbox;

using Reflect;

class DynamicHammer 
{
	public static function flatten(object:Dynamic):Array<Dynamic>
	{
		return object.fields().map(function(key:String)
		{
			return object.field(key);
		});
	}
}