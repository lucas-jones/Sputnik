(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.find = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(f(v)) return v;
	}
	return null;
};
var Reflect = function() { };
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var nodejs = {};
nodejs.NodeJS = function() { };
nodejs.NodeJS.get_dirname = function() {
	return __dirname;
};
nodejs.NodeJS.get_filename = function() {
	return __filename;
};
nodejs.NodeJS.require = function(p_lib) {
	return require(p_lib);
};
nodejs.NodeJS.get_process = function() {
	return process;
};
nodejs.NodeJS.setTimeout = function(cb,ms) {
	return setTimeout(cb,ms);
};
nodejs.NodeJS.clearTimeout = function(t) {
	return clearTimeout(t);
};
nodejs.NodeJS.setInterval = function(cb,ms) {
	return setInterval(cb,ms);
};
nodejs.NodeJS.clearInterval = function(t) {
	return clearInterval(t);
};
nodejs.NodeJS.assert = function(value,message) {
	require('assert')(value,message);
};
nodejs.NodeJS.get_global = function() {
	return global;
};
nodejs.NodeJS.resolve = function() {
	return require.resolve();
};
nodejs.NodeJS.get_cache = function() {
	return require.cache;
};
nodejs.NodeJS.get_extensions = function() {
	return require.extensions;
};
nodejs.NodeJS.get_module = function() {
	return module;
};
nodejs.NodeJS.get_exports = function() {
	return exports;
};
nodejs.NodeJS.get_domain = function() {
	return domain.create();
};
nodejs.NodeJS.get_repl = function() {
	return require('repl');
};
nodejs.ProcessEventType = function() { };
nodejs.REPLEventType = function() { };
nodejs.events = {};
nodejs.events.EventEmitterEventType = function() { };
nodejs.fs = {};
nodejs.fs.ReadStreamEventType = function() { };
nodejs.fs.WriteStreamEventType = function() { };
nodejs.http = {};
nodejs.http.HTTPMethod = function() { };
nodejs.http.HTTPServerEventType = function() { };
nodejs.stream = {};
nodejs.stream.ReadableEventType = function() { };
nodejs.http.IncomingMessageEventType = function() { };
nodejs.http.IncomingMessageEventType.__super__ = nodejs.stream.ReadableEventType;
nodejs.http.IncomingMessageEventType.prototype = $extend(nodejs.stream.ReadableEventType.prototype,{
});
nodejs.http.ServerResponseEventType = function() { };
nodejs.net = {};
nodejs.net.TCPServerEventType = function() { };
nodejs.net.TCPSocketEventType = function() { };
nodejs.stream.WritableEventType = function() { };
var sputnik = {};
sputnik.Sputnik = function() { };
sputnik.Sputnik.main = function() {
	console.log("Sputnik");
	var request = nodejs.NodeJS.require("request");
	var cookieJar = request.jar();
	var cookie = request.cookie("auth=eyJfdXNlciI6WyJVU1oxQlhEQ1lYSUpFQUJJTTIzVjMiLDEsIldUczZGTjRWMGhyTFp5c2tYSEpXYkMiLDE0MjU0ODcwMzUsMTQyNTQ5MTA0OV19|1425491394|90debaa4da77f4d14b5f13da72ce67f652352f9d");
	var url = "http://triton.ironhelmet.com/grequest/order";
	cookieJar.setCookie(cookie,url);
	var form = { type : "order", order : "full_universe_report", version : 7, game_number : 6129024176750592};
	request.post({ url : url, jar : cookieJar, form : form},function(b,a) {
		var report = sputnik.satellite.Report.fromDynamic(JSON.parse(a.body).report);
		var path = [];
		var _g = 0;
		var _g1 = report.fleets;
		while(_g < _g1.length) {
			var fleet = _g1[_g];
			++_g;
			if(fleet.name == "Alkurah VIII") {
				var _g2 = 0;
				var _g3 = fleet.waypoint;
				while(_g2 < _g3.length) {
					var waypoint = [_g3[_g2]];
					++_g2;
					var star = Lambda.find(report.stars,(function(waypoint) {
						return function(star1) {
							return star1.uid == waypoint[0][1];
						};
					})(waypoint));
					path.push(star.name);
				}
				console.log(path.join(" -> "));
			}
		}
		console.log("Game: " + report.name);
		console.log("Player: " + report.current.name);
	});
};
sputnik.radio = {};
sputnik.radio.Radio = function() { };
sputnik.radio.Radio.transmit = function(message) {
	var pushover = nodejs.NodeJS.require("pushover.net");
	pushover({ user : "uY75q8nxUVLxSD8TacaeUfXZZ4XrLg", token : "aExkVfyovoF4BSjCzTG6h9vD9aGKmQ", title : "Sputnik", message : message, priority : 1}).end();
};
sputnik.satellite = {};
sputnik.satellite.TechStats = function() {
};
sputnik.satellite.TechStats.fromDynamic = function(data) {
	var techStats = new sputnik.satellite.TechStats();
	techStats.value = Reflect.field(data,"value");
	techStats.level = Reflect.field(data,"level");
	return techStats;
};
sputnik.satellite.Technology = function() {
};
sputnik.satellite.Technology.fromDynamic = function(data) {
	var technology = new sputnik.satellite.Technology();
	technology.scanning = sputnik.satellite.TechStats.fromDynamic(Reflect.field(data,"scanning"));
	technology.propulsion = sputnik.satellite.TechStats.fromDynamic(Reflect.field(data,"propulsion"));
	technology.terraforming = sputnik.satellite.TechStats.fromDynamic(Reflect.field(data,"terraforming"));
	technology.research = sputnik.satellite.TechStats.fromDynamic(Reflect.field(data,"research"));
	technology.weapons = sputnik.satellite.TechStats.fromDynamic(Reflect.field(data,"weapons"));
	technology.banking = sputnik.satellite.TechStats.fromDynamic(Reflect.field(data,"banking"));
	technology.manufacturing = sputnik.satellite.TechStats.fromDynamic(Reflect.field(data,"manufacturing"));
	return technology;
};
sputnik.satellite.Player = function() {
};
sputnik.satellite.Player.fromDynamic = function(data) {
	var player = new sputnik.satellite.Player();
	player.uid = Reflect.field(data,"uid");
	player.name = Reflect.field(data,"alias");
	player.stars = Reflect.field(data,"total_stars");
	player.fleets = Reflect.field(data,"total_fleets");
	player.strength = Reflect.field(data,"total_strength");
	player.industry = Reflect.field(data,"total_industry");
	player.science = Reflect.field(data,"total_science");
	player.economy = Reflect.field(data,"total_economy");
	player.technology = sputnik.satellite.Technology.fromDynamic(Reflect.field(data,"tech"));
	return player;
};
sputnik.satellite.Report = function() {
};
sputnik.satellite.Report.fromDynamic = function(data) {
	var report = new sputnik.satellite.Report();
	report.name = Reflect.field(data,"name");
	report.players = sputnik.toolbox.DynamicHammer.flatten(Reflect.field(data,"players")).map(sputnik.satellite.Player.fromDynamic);
	report.fleets = sputnik.toolbox.DynamicHammer.flatten(Reflect.field(data,"fleets")).map(sputnik.satellite.Fleet.fromDynamic);
	report.stars = sputnik.toolbox.DynamicHammer.flatten(Reflect.field(data,"stars")).map(sputnik.satellite.Star.fromDynamic);
	report.current = report.getPlayerByUid(Reflect.field(data,"player_uid"));
	return report;
};
sputnik.satellite.Report.prototype = {
	getPlayerByName: function(name) {
		return Lambda.find(this.players,function(player) {
			return player.name == name;
		});
	}
	,getPlayerByUid: function(uid) {
		return Lambda.find(this.players,function(player) {
			return player.uid == uid;
		});
	}
};
sputnik.satellite.Fleet = function() {
};
sputnik.satellite.Fleet.fromDynamic = function(data) {
	var fleet = new sputnik.satellite.Fleet();
	fleet.uid = Reflect.field(data,"uid");
	fleet.puid = Reflect.field(data,"puid");
	fleet.name = Reflect.field(data,"n");
	fleet.x = Reflect.field(data,"x");
	fleet.y = Reflect.field(data,"y");
	fleet.lx = Reflect.field(data,"lx");
	fleet.ly = Reflect.field(data,"ly");
	fleet.size = Reflect.field(data,"st");
	fleet.waypoint = Reflect.field(data,"o");
	fleet.w = Reflect.field(data,"w");
	fleet.l = Reflect.field(data,"l");
	return fleet;
};
sputnik.satellite.Star = function() {
};
sputnik.satellite.Star.fromDynamic = function(data) {
	var star = new sputnik.satellite.Star();
	star.uid = Reflect.field(data,"uid");
	star.puid = Reflect.field(data,"puid");
	star.name = Reflect.field(data,"n");
	star.x = Reflect.field(data,"x");
	star.y = Reflect.field(data,"y");
	return star;
};
sputnik.toolbox = {};
sputnik.toolbox.DynamicHammer = function() { };
sputnik.toolbox.DynamicHammer.flatten = function(object) {
	return Reflect.fields(object).map(function(key) {
		return Reflect.field(object,key);
	});
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
nodejs.ProcessEventType.Exit = "exit";
nodejs.ProcessEventType.Exception = "uncaughtException";
nodejs.REPLEventType.Exit = "exit";
nodejs.events.EventEmitterEventType.NewListener = "newListener";
nodejs.events.EventEmitterEventType.RemoveListener = "removeListener";
nodejs.fs.ReadStreamEventType.Open = "open";
nodejs.fs.WriteStreamEventType.Open = "open";
nodejs.http.HTTPMethod.Get = "GET";
nodejs.http.HTTPMethod.Post = "POST";
nodejs.http.HTTPMethod.Options = "OPTIONS";
nodejs.http.HTTPMethod.Head = "HEAD";
nodejs.http.HTTPMethod.Put = "PUT";
nodejs.http.HTTPMethod.Delete = "DELETE";
nodejs.http.HTTPMethod.Trace = "TRACE";
nodejs.http.HTTPMethod.Connect = "CONNECT";
nodejs.http.HTTPServerEventType.Listening = "listening";
nodejs.http.HTTPServerEventType.Connection = "connection";
nodejs.http.HTTPServerEventType.Close = "close";
nodejs.http.HTTPServerEventType.Error = "error";
nodejs.http.HTTPServerEventType.Request = "request";
nodejs.http.HTTPServerEventType.CheckContinue = "checkContinue";
nodejs.http.HTTPServerEventType.Connect = "connect";
nodejs.http.HTTPServerEventType.Upgrade = "upgrade";
nodejs.http.HTTPServerEventType.ClientError = "clientError";
nodejs.stream.ReadableEventType.Readable = "readable";
nodejs.stream.ReadableEventType.Data = "data";
nodejs.stream.ReadableEventType.End = "end";
nodejs.stream.ReadableEventType.Close = "close";
nodejs.stream.ReadableEventType.Error = "error";
nodejs.http.IncomingMessageEventType.Data = "data";
nodejs.http.IncomingMessageEventType.Close = "close";
nodejs.http.IncomingMessageEventType.End = "end";
nodejs.http.ServerResponseEventType.Close = "close";
nodejs.http.ServerResponseEventType.Finish = "finish";
nodejs.net.TCPServerEventType.Listening = "listening";
nodejs.net.TCPServerEventType.Connection = "connection";
nodejs.net.TCPServerEventType.Close = "close";
nodejs.net.TCPServerEventType.Error = "error";
nodejs.net.TCPSocketEventType.Connect = "connect";
nodejs.net.TCPSocketEventType.Data = "data";
nodejs.net.TCPSocketEventType.End = "end";
nodejs.net.TCPSocketEventType.TimeOut = "timeout";
nodejs.net.TCPSocketEventType.Drain = "drain";
nodejs.net.TCPSocketEventType.Error = "error";
nodejs.net.TCPSocketEventType.Close = "close";
nodejs.stream.WritableEventType.Drain = "drain";
nodejs.stream.WritableEventType.Finish = "finish";
nodejs.stream.WritableEventType.Pipe = "pipe";
nodejs.stream.WritableEventType.Unpipe = "unpipe";
nodejs.stream.WritableEventType.Error = "error";
sputnik.radio.Radio.TITLE = "Sputnik";
sputnik.radio.Radio.USER = "uY75q8nxUVLxSD8TacaeUfXZZ4XrLg";
sputnik.radio.Radio.TOKEN = "aExkVfyovoF4BSjCzTG6h9vD9aGKmQ";
sputnik.Sputnik.main();
})();
