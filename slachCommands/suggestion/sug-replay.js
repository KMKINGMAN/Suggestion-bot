const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"),
GUILDMODAL = require('../../Modals/suggestion/main'),
USERSMODAL = require('../../Modals/suggestion/users')
module.exports = {
  name: "sug-replay",
  description: "to replay the suggestion",
  type: "CHAT_INPUT",
  options: [
    {
      name: "message",
      description: "the suggestion message id",
      type: 3,
      required: true,
    },
    {
      name: "replay",
      description: "the suggestion message replay",
      type: 3,
      required: true,
    },
  ],
  permissions : [
    "MANAGE_CHANNELS"
  ],
  run: async (client, err , send, interaction) => {
    const options = interaction.options._hoistedOptions;
    let messageid = options.find((e) => e.name === "message"),
    replay = options.find((e) => e.name === "replay")
    GuildData = await GUILDMODAL.findOne({
      GuildID: interaction.guild.id
    });
    if(!GuildData){
      return interaction.reply({
        embeds : [err('Please set up a suggestion channel')]
      })
    }
    if(!GuildData || !interaction.guild.channels.cache.get(GuildData.ChannelID)){
      return interaction.reply({})
    }
    let UserData = await USERSMODAL.findOne({
      MsgID : messageid.value
    })
    if(!UserData){
      return interaction.reply({
        embeds : [err('Invalid message id')]
      })
    }
    let Chnnel = interaction.guild.channels.cache.get(GuildData.ChannelID)
    if(!Chnnel){
      return interaction.reply({
        embeds : [err('Please set up a suggestion channel')]
      }) 
    }
    let message = await Chnnel
    .messages.fetch(UserData.MsgID).catch(e => {})
    if(!message){
      return await interaction.reply({
         embeds : [err('I can\'t find Suggestion channel')]
      })
    }
    await UserData.Replay.push({
      "Admine": interaction.member
.id,
      "Replay": replay.value
    })
    UserData.save()
    let reps = UserData.Replay.map((D) => `**Admin: <@${D.Admine}>\nReply: \`${D.Replay}\`**`),
    name = interaction.member.user
.tag,
    name2 = client.users.cache.get(UserData.UserID).tag,
    ava = client.users.cache.get(UserData.UserID).displayAvatarURL()
    let embed = new MessageEmbed()
    .setAuthor(`${name2}`, ava)
    .setTitle(`**[✅] Reply**`)
    .setColor(`GREEN`)
    .setDescription(`**${UserData.Sug}**`)
    .addField(`**replies **`,reps.join('\n'))
    message.edit({embeds : [embed]});
    /////
     const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel('GO TO REPLAY')
        .setStyle('LINK')
        .setURL(`https://discord.com/channels/${interaction.guild.id}/${Chnnel.id}/${UserData.MsgID}`)
    );
    await interaction.reply({
      embeds: [send('Added New Reply', 'New Reply Were Added ' + replay.value)],
      components: [row]
    })
    let nc = new MessageEmbed()
    .setAuthor(`${name2}`, ava)
    .setTitle(`**[✅] Some admin replay to your suggesion**`)
    .setDescription(`**\`${name}\` Reply to Your Suggestion**\n**REPLAY: \`${replay.value}\`\n[Click Here](https://discord.com/channels/${interaction.guild.id}/${Chnnel.id}/${UserData.MsgID})**`)
    let user = interaction.guild.members.cache.get(UserData.UserID)
    user.send({embeds: [nc], components: [row]}).catch((e) =>{})
  }
}
