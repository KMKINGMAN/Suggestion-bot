const { MessageEmbed } = require("discord.js"),
GUILDMODAL = require('../../Modals/suggestion/main')
 module.exports = {
   name: "sug-setchannel",
   category: "suggenstion",
   usage: [
     "[channel]"
   ],
   description: "to set suggestion channel",
   run: async (client, kmsg, args, PREFIX, KMSG) => {
    let chick = await KMSG.PremM("MANAGE_CHANNELS")
    if(!chick){
      return KMSG.ERR('You Need \`MANAGE_CHANNELS\` premssion to do this action')
    }
    let ch = await KMSG.GetChannel(args[0])
    if(ch.type !== "GUILD_TEXT"){
      return KMSG.ERR('The channel must be a text channel')
    }
    if(!ch){
      return KMSG.ERR(`You must specify the Channel\n Usage: \`${PREFIX}${module.exports.name} <channel>\``)
    }
    let x = await GUILDMODAL.findOneAndUpdate({
      GuildID : kmsg.guild.id,
    },{
      $set :{
        ChannelID : ch.id
      }
    }
    )
    if(!x) {
      x = await GUILDMODAL.create({
        GuildID: kmsg.guild.id,
        ChannelID: ch.id
      })
    }
    x.save()
    await KMSG.SEND(`Channel saved!`, `**Suggestions channel has been updated to <#${ch.id}>**`)
    }
 }
