const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"),
GUILDMODAL = require('../../Modals/suggestion/main'),
USERSMODAL = require('../../Modals/suggestion/users');
module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction, user, client) {
    try{
      if(user.partial) await user.fetch();
      if(reaction.partial) await reaction.fetch();
      if(reaction.message.partial) await reaction.message.fetch(); 
      let gdata = await GUILDMODAL.findOne({GuildID:reaction.message.guild.id})
      if(!gdata) return;
      if(!gdata) return;
      if(reaction.emoji.name === '✅') return;
      if(user.bot) return;
      let data = await USERSMODAL.findOne({MsgID:reaction.message.id})
      if(!data) return;
      const row = new MessageActionRow() 
      .addComponents( 
        new MessageButton() 
        .setLabel('GO TO REPLAY') 
        .setStyle('LINK') 
        .setURL(`https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${data.MsgID}`) 
        );
      let es = new MessageEmbed()
      .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 1024 }))
      .setColor('BLUE')
      .setDescription(`**Thank you for using our suggestion bot you add reaction [${reaction.emoji}] to <@${data.UserID}> suggestion**\n **[MESSAGE](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${data.MsgID})**`)
      .setFooter(reaction.message.guild.name, client.user.avatarURL({ dynamic: true, size: 1024 }))
      try {
        user.send({embeds: [es],  components: [row]})
      } catch(e) {
        console.log(` `)
      }    
    } catch(e){

    }
  }
}
