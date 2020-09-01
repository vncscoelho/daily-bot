var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var cron = require("node-cron");
var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
var runDaily = function(channelID) {
    members = shuffleArray(members);

    bot.sendMessage({
        tts: true,
        to: channelID,
        message: "É hora da daily. Pode começar, **" + members[0] + "**."
    });

    bot.sendMessage({
        to: channelID,
        message: "\n*A ordem será: \n*" + members.join(",\n")
    });
}

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

var members = [
    "Vinicius",
    "Jean",
    "Naiguel",
    "Vitor",
    "Deborah",
    "Diane",
    "Camila",
    "João",
    "José",
    "Marcelo",
    "Rodolfo",
    "Henrique"
];

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    cron.schedule("00 17 * * *", function() {
        runDaily(743476427323605094);
      });
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            case 'daily':
                runDaily(channelID);
                break;
        }
    }
});