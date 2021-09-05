const {
    Collection
} = require("discord.js")
module.exports = (client) => {
    client.commands = new Collection(),
    client.eventss = new Collection(),
    client.aliases = new Collection(),
    client.invites = new Collection(),
    client.slachCommands = new Collection();
}