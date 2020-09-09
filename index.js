const keep_alive = require('./keep_alive.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const members = JSON.parse(process.env.members);
const cron = require("node-cron");

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function runDaily(channel) {
    let m = shuffleArray(members);

    channel.send({
        content: "É hora da daily. Pode começar,** " + m[0] + " **.",
        options: {
            tts: true
        }
    });

    channel.send("\nA ordem será: \n" + m.join(",\n") + "\n**Fé em deus rapaziada. Só balãozada.**");
}

client.on('ready', () => {
    console.log('Connected');

    client.channels.fetch('743476427323605094')
        .then(channel => {
            cron.schedule("00 17 * * 1,3,4,5", () => {
                runDaily(channel);
            }, {
                scheduled: true,
                timezone: "America/Sao_Paulo"
            })
        });
});

client.on('message', function ({ content, channel }) {
    if (content.substring(0, 1) == '!') {
        var args = content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            case 'daily':
                runDaily(channel);
                break;
        }
    }
});

client.login(token);