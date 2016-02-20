/*
	COMMANDS

	This file handles all the commands. To add a new command, just follow the style
	of the ones that are already there.
*/

/*
	Aliases: if your command has multiple names, add the aliases here.
*/
var aliases = {
	"h": "help", "commands": "help",
	"p": "ping",
	"i": "info",
	"a": "avatar",
};

/*
	Commands: this is the main command handler.
*/
var commands = {
	// Help: DM's a user with the help.
	"help": {
		desc: "Sends a DM to the requesting user with the help.",
		usage: "[command]",
		shouldDisplay: false,
		deleteCommand: true,
		process: function(bot, msg, suffix) {
			var msgArray = [];
			if (!suffix) {
				msgArray.push("Use `!help <command name>` to get info on a specific command.");
				msgArray.push("You can also find examples and more at __<insert Git here>__");
				msgArray.push("**Commands:**\n");
				Object.keys(commands).forEach(function(cmd) {
					if (commands[cmd].hasOwnProperty("shouldDisplay")) {
						if (commands[cmd].shouldDisplay) {
							msgArray.push("`!" + cmd + " " + commands[cmd].usage + "`\n		" + commands[cmd].desc);
						}
					} else {
						msgArray.push("`!" + cmd + " " + commands[cmd].usage + "`\n		" + commands[cmd].desc);
					}
				});
				var helpMessage = msgArray.join("\n");
				var helpPart2 = helpMessage.substring(helpMessage.indexOf("`]lotto`"));
				var helpPart1 = helpMessage.substring(0, helpMessage.indexOf("`]lotto`") - 1);
				bot.sendMessage(msg.author, helpPart1);
				bot.sendMessage(msg.author, helpPart2);
			} else {
				if (commands.hasOwnProperty(suffix)) {
					msgArray.push("**!" + suffix + ": **" + commands[suffix].desc);
					if (commands[suffix].hasOwnProperty("usage")) {
						msgArray.push("**Usage:** `!" + suffix + " " + commands[suffix].usage + "`");
					}
					if (commands[suffix].hasOwnProperty("deleteCommand")) {
						msgArray.push("*This command will delete the message that activates it*");
					}
					bot.sendMessage(msg, msgArray);
				} else {
					bot.sendMessage(msg, "Command `" + suffix + "` not found.", function(erro, wMessage) {
						bot.deleteMessage(wMessage, {"wait": 8000});
					});
				}
			}
		}
	},

	//Ping
	ping: {
		desc: "Returns a pong message.",
		usage: "[command]",
		shouldDisplay: true,
		deleteCommand: true,
		process: function(bot, msg) {
			bot.sendMessage(msg, "Pong!");
		}
	},
}

// Exports for the commands and aliases.
exports.commands = commands;
exports.aliases = aliases;