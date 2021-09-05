const colors = require("colors"),
{ Collection } = require('discord.js'),
figlet = require('figlet'),
{
    MessageEmbed
} = require('discord.js'),
GUILDMODAL = require('../../Modals/suggestion/main');
module.exports = {
	name: 'interactionCreate',
  async execute(interaction ,client){
    try {
        let Data = await GUILDMODAL.findOne({
        GuildID: interaction.guild.id,
        ChannelID: interaction.channel.id
        })
      if(Data) return;
        let err = (des) => {
        let errs = new MessageEmbed()
        .setColor('YELLOW')
        .setAuthor(interaction.member.user.tag, interaction.member.user.avatarURL({
          dynamic: true,
          size: 1024 
        }))
      .setTitle(`**\⚠ Error**`)
      .setDescription(`**\⛔ ${des}**`)
      .setFooter(`Req By ${interaction.member.user.tag}`, interaction.member.user.avatarURL({
        dynamic: true,
        size: 1024 
      }))
      return errs
      }
      let send = (title, des) =>{
        let sends = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(interaction.member.user.tag,
        interaction.member.user.avatarURL({
              dynamic: true,
              size: 1024 
        }))
        .setTitle(`**\✅ ${title} **`)
        .setDescription(`**${des}**`)
        .setFooter(`Req By ${interaction.member.user.tag}`, interaction.member.user.avatarURL({
            dynamic: true,
            size: 1024 
        }))
        return sends
      }
      if (interaction.isCommand()) {
        const cmd = client.slachCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply({
          content: "Something Went Wrong"
        });

        const embed = new MessageEmbed()
        .setColor("BLUE");
        if (!interaction.guild.me.permissions.has([
          "SEND_MESSAGES", 
          "EMBED_LINKS"
        ])) {
          embed
          .setDescription(`:x: I Need \`SEND_MESSAGES\` & \`EMBED_LINKS\` Permission`)
          return await interaction.member
          .send({
              embeds:[embed], ephemeral: true
          })
        }
        if (!interaction.member.permissions.has(cmd.permissions || [])) {
              embed
              .setDescription(`:x: You Need these Permissions \`\`\`${cmd.permissions.join(", ")}\`\`\``)
          return await interaction.reply({
              embeds:[embed], ephemeral: true
          })
        }
        if (!interaction.guild.me.permissions.has(cmd.botPerms || [])) {
              embed
              .setDescription(`:x: I Need these Permissions \`\`\`${cmd.permissions.join(", ")}\`\`\``)
          return await interaction.reply({
              embeds:[embed], ephemeral: true
          })
        }
        cmd.run(client, err, send, interaction);
      }
    } catch(e){
    }    
  }
}