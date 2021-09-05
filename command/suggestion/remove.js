const { MessageEmbed } = require("discord.js"),
GUILDMODAL = require('../../Modals/suggestion/main'),
USERSMODAL = require('../../Modals/suggestion/users')
 module.exports = {
   name: "sug-remove",
   category: "suggenstion",
   usage: [
     "message id"
   ],
   description: "to delete suggenstion",
   run: async(client, kmsg, args, PREFIX, KMSG)=>{
    let chick = await KMSG.PremM("MANAGE_CHANNELS")
    if(!chick){
      return KMSG.ERR('You Need \`MANAGE_CHANNELS\` premssion to do this action')
    }
      let mesgid = args[0]
      if(!mesgid) {
        return await KMSG.ERR(`You must specify the message id`)
      }
      let data = await USERSMODAL.findOne({MsgID:mesgid})
      if(!data) {
        return await KMSG.ERR(`invailde message id`)
      }
      let setting = await GUILDMODAL.findOne({GuildID:kmsg.guild.id})
      if(!setting) {
        return fu.ERR(`The Suggestion channel was not found`)
      }
      let channel = kmsg.guild.channels.cache.get(setting.ChannelID);
      if(!channel) {
        return KMSG.ERR(`The Suggestion channel was not found`)
      }
      let msg = await channel.messages.fetch(data.MsgID).catch(e => {})
        msg.delete();
        data.deleteOne();
        await KMSG.SEND(`Databace Updated`,`Suggestion removed successfully`)
    }
 }