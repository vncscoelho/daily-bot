var Discord = require('discord.io');
var dotenv = require('dotenv');
dotenv.config();
var logger = require('winston');
var token = process.env.token;
var members = JSON.parse(process.env.members);
var cron = require("node-cron");

var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var runDaily = function (channelID) {
    members = shuffleArray(members);

    bot.sendMessage({
        tts: true,
        to: channelID,
        message: "É hora da daily. Pode começar,** " + members[0] + " **."
    });

    bot.sendMessage({
        to: channelID,
        message: "\nA ordem será: \n" + members.join(",\n") + "\n**Fé em deus rapaziada. Só balãozada.**"
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
    token: token,
    autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    cron.schedule("00 17 * * 1,3,4,5", function () {
        runDaily("743476427323605094");
    }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
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