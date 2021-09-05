const { readdirSync } = require("fs"),
ascii = require("ascii-table"),
fs = require("fs"),
colors = require("colors"),
table = new ascii("SlachCommands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    let Commands = []
    readdirSync("./slachCommands/").forEach(dir => {
        const commands = readdirSync(`./slachCommands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let cmd = require(`../slachCommands/${dir}/${file}`);
            if (cmd.name) {
                client.slachCommands.set(cmd.name, cmd);
                Commands.push(cmd)
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌`);
                continue;
            }
        }
    });
    console.log(table.toString().brightCyan); 
////////////////////////////////////////////////
    client.on("ready", async () => {
        try {
            Commands.forEach(async (cmd) => {
            await client.guilds.cache.forEach(async (guild) => {
              await guild.commands.create(cmd)
            });
          });
        } catch (err) {}
      }) 
}