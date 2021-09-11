const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"),
GUILDMODAL = require('../../Modals/suggestion/main');
module.exports = {
  name: "set-sugchannel",
  description: "to set suggestion channel",
  type: "CHAT_INPUT",
  options: [
    {
      name: "channel",
      description: "discord text channel",
      type: 7,
      required: true,
    },
  ],
  permissions : [
    "MANAGE_CHANNELS"
  ],
  run: async (client, err , send, interaction) => {
    const options = interaction.options._hoistedOptions;
    let data = options.find((e) => e.name === "channel"),
    channel = interaction.guild.channels.cache.get(data.value)
    if(channel.type !== "GUILD_TEXT"){
      return interaction.reply({
        embeds: [err('The channel must be a text channel')]
      })
    }
    let x = await GUILDMODAL.findOneAndUpdate({
      GuildID : interaction.guild.id,
    },{
      $set :{
        ChannelID : data.value
      }
    }
    )
    if(!x) {
      x = await GUILDMODAL.create({
        GuildID: interaction.guild.id,
        ChannelID: data.value
      })
    }
    x.save()
    interaction.reply({
      embeds: [send (`Channel saved!`, `** Suggestions channel has been updated to <#${channel.id}>**`)]
    })
  }
}
