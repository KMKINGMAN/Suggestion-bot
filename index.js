const kingman = require("./host/keep_work.js"),
{
  Collection,
  Client,
  Intents
} = require("discord.js"),
client = new Client({
    shards: "auto",
    allowedMentions: {
      parse: [ ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
fs = require('fs'),
kingman();
const TOKEN_BOT = process.env['KM_TOKEN'],
config = require('./localdb/kingman.json'),
PREFIX = config.prefix;
client.commands = new Collection(),
client.eventss = new Collection(),
client.aliases = new Collection(),
client.invites = new Collection(),
client.slachCommands = new Collection();
client.on("error", console.error);
["command", "events", "intration"].forEach(p => {
  require(`./handler/${p}`)(client);
});
client.login(TOKEN_BOT)