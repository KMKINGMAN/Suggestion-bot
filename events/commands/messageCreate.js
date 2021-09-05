const KINGMAN = require("../../handler/index"),
config = require('../../localdb/kingman.json'),
GUILDMODAL = require('../../Modals/suggestion/main'),
PREFIX = config.prefix;
module.exports = {
	name: 'messageCreate',
  async execute(kmsg ,client){
    try {
   const Msg = new KINGMAN.MSG(client, kmsg),
  pmention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (kmsg.content.match(pmention)) {
    return kmsg.reply(`**MY PREFIX IS: ${PREFIX}**`)
  }
  if (kmsg.author.bot) return;
  if (!kmsg.guild) {
    return kmsg.reply({ content: "**ONLY WORK ON SERVERS NOT DM**"})
  }
  if (!kmsg.content.startsWith(PREFIX)) return;
  const args = kmsg.content
  .slice(PREFIX.length)
  .trim() 
  .split(/ +/g), 
  kmcommand = args.shift().toLowerCase();
  if (kmcommand.length === 0) return;
  let kmcode = client.commands.get(kmcommand);
  if (!kmcode) kmcode = client.commands.get(client.aliases.get(kmcommand));
  if (kmcode) kmcode.run(client, kmsg, args, PREFIX, Msg);
    } catch(e){
    }    
  }
}