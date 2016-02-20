# How to make commands for Finn The Bot
To add a command, there are several steps you need to follow. First open 'commands.js'. If your command has aliases (i.e.
multiple names), add them to the **aliases** variable like this:
```javascript
"alias1": "command name", "alias2": "command name, "alias3": "command name", //comma
```

If your command does not have aliases, skip the step above and continue to the **commands** variable. In there, scroll to the bottom,
or wherever you see fit, and add your command following the style below:

```javascript
var commands = {
	...
	...
	// Command Name
	commandname: {
		desc: "Brief description of what your command does", //comma
		usage: "How to use the command", //comma
		shouldDisplay: true /* if this command should be displayed on the help, or */ false /* if not */, //comma
		deleteCommand: true /* if the message of the command should be automatically deleted, or */ false /* if not */, //comma
		// Here's the process of your command. It should always be a function.
		process: function(bot, msg, (suffix)) { // Suffix is optional. The suffix would be, in the message: !command <suffix>. Use suffix if you're gonna work with user inputs.
			// Insert the process here. If you need any help with this, check out
			// the discord.js documentation below, or ask Amery, he'll know what to do.
			// :D
		}
	}, //comma
}
```

**Notes:** NEVER FORGET THE COMMAS! Note all the comments "//comma".

### The manuals
- [Discord.js Documentation](https://discordjs.readthedocs.org/en/latest/)
- [JavaScript Cheat Sheet](http://overapi.com/javascript/)
- [JavaScript Tutorials](http://www.w3schools.com/js/)
