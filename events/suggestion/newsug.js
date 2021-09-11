const GUILDMODAL = require('../../Modals/suggestion/main'),
USERSMODAL = require('../../Modals/suggestion/users'),
{
  MessageEmbed
} = require("discord.js"),
config = require('../../localdb/kingman.json'),
PREFIX = config.prefix;
module.exports = {
	name: 'messageCreate',
  async execute(kmsg, client) {
    if (kmsg.content.startsWith(PREFIX)||kmsg.content.startsWith("/")) return;
    if(kmsg.author.bot) return;
    let GuildData = await GUILDMODAL.findOne({
      GuildID: kmsg.guild.id
    }),
    Content = kmsg.content.split(' ').join(" ")
    if(!GuildData) return;
    let Channel = kmsg.guild.channels.cache.get(GuildData.ChannelID)
    if(!Channel){
      return
    }
    if(kmsg.channel.id === Channel.id){
      setTimeout(() => kmsg.delete(), 1)
      let Embed = new MessageEmbed()
      .setTitle(kmsg.author.tag,
      kmsg.author.avatarURL({ 
        dynamic: true, 
        size: 1024
        })
      )
      .setDescription(`**${Content}**`)
      .setColor(`BLUE`)
      .setFooter(`Req by ${kmsg.author.tag}`, kmsg.author.avatarURL({ dynamic: true, size: 1024 }))
      let data =  await Channel.send({embeds: [Embed]})
      data.react('✅')
      data.react('❌')
      let UserData = await USERSMODAL.create({
      GuildID: kmsg.guild.id,
      UserID: kmsg.author.id,
      MsgID: data.id,
      Sug: Content
      })
      UserData.save()
      }
    
  }
}
