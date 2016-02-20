/*
	MAIN

	This is the file which handles the startup of Finn The Bot.
*/

// Requires
var Discord = require('discord.js');
var readline = require('readline');
var colors = require('./styles.js');
var commands = require('./commands.js');

// Initialize bot
var bot = new Discord.Client();

// Other Variables
var commandReturn; // Return for the commands

login();

// When the bot is ready, log it to the console and send a message.
bot.on("ready", function() {
	bot.setPlayingGame("Adventure Time");

	console.log(colors.cGreen("Adventure Time, come on grab your friends, we're going to very Discord lands!"));
});

// When a new member joins, greet them.
bot.on("serverNewMember", function(message, user){
	bot.sendMessage(server.default.channel, "Welcome to ***AD Old Friends***, " + user.mention() + ". We hope you have a great time here :D");
});

// Command handling!
bot.on("message", (msg) => {
	// Check if the message sent starts with the prefix
	if (!msg.content.startsWith("!")) return;
	// Prevent the bot from responding to itself
	if (msg.author.id == bot.user.id) return;

	// Set cmd to be just the command part from the message
	var cmd = msg.content.split(" ")[0].replace(/\n/g, " ").substring(1).toLowerCase();
	// Separate command from the suffix
	var suffix = msg.content.replace(/\n/g, " ").substring(cmd.length + 2);

	// Main command handler
	if(msg.content.startsWith("!")) {
		if(commands.commands.hasOwnProperty(cmd)) {
			console.log(colors.cGreen(msg.author.username) + " used " + msg.content + " in #" + msg.channel.name);
			execCommand(msg, cmd, suffix);
		}
	}
});

// execCommand function.
function execCommand(msg, cmd, suffix) {
	try {
		if(!msg.channel.isPrivate) { // Check if this is a DM or not
			console.log(colors.cServer(msg.channel.server.name) + " > " + colors.cGreen(msg.author.username) + " > " + msg.content.replace(/\n/g, " "));
		} else { 
			console.log(colors.cGreen(msg.author.username) + " > " + msg.content.replace(/\n/g, " "));
		}

		// Go to the commands file and execute the command
		commands.commands[cmd].process(bot, msg, suffix);

		// If your command has this property, the message will be deleted after 8000ms
		if (commands.commands[cmd].hasOwnProperty("deleteCommand")) {
			if (commands.commands[cmd].deleteCommand === true) {
				bot.deleteMessage(msg, {"wait": 8000});
			}
		}
	}
	catch (err) {
		console.log(err.stack);
	}
}

// Login handling. We don't want to show the password, do we? >:)
function login(){
	console.log('Getting ready for the Adventure!');
	var rl = readline.createInterface(process.stdin, process.stdout);
	rl.setPrompt('Enter password: ');
	rl.prompt();
	rl.on('line', function(line) {
		bot.login("botgaben9k@gmail.com", line, function(error){
			if(error == null) return;
			else rl.prompt();
		});
	});
}