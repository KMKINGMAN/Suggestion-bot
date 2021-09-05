const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"),
GUILDMODAL = require('../../Modals/suggestion/main'),
USERSMODAL = require('../../Modals/suggestion/users')
module.exports = {
  name: "sug-remove",
  description: "to remove the suggestion",
  type: "CHAT_INPUT",
  options: [
    {
      name: "message",
      description: "the suggestion message id",
      type: 3,
      required: true,
    }
  ],
  permissions : [
    "MANAGE_CHANNELS"
  ],
  run: async (client, err , send, interaction) => {
    const options = interaction.options._hoistedOptions;
    let messageid = options.find((e) => e.name === "message")
      let mesgid = messageid.value
      let data = await USERSMODAL.findOne({MsgID:mesgid})
      if(!data) {
        return interaction.reply({
          embeds : [err('invailde message id')]
        });
      }
      let setting = await GUILDMODAL.findOne({GuildID:interaction.guild.id})
      if(!setting) {
        return interaction.reply({
          embeds : [err('The Suggestion channel was not found')]
        });
      }
      let channel = interaction.guild.channels.cache.get(setting.ChannelID);
      if(!channel) {
        return interaction.reply({
          embeds : [err('The Suggestion channel was not found')]
        });
      }
      let msg = await channel.messages.fetch(data.MsgID).catch(e => {})
        msg.delete();
        data.deleteOne();
        interaction.reply({
          embeds : [send( `Databace Updated`,`Suggestion removed successfully`)]
        }); 
  }
}
