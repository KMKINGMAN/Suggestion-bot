const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
 module.exports = {
   name: "developers",
   category: "dev",
   description: "This displays contact information with the developer",
   run: async (client, kmsg, args, prefix, KMSGC) => {
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('GitHub')
          .setStyle('LINK')
          .setURL(`https://github.com/KMKINGMAN`),
        new MessageButton()
        .setLabel('Discord Server')
          .setStyle('LINK')
          .setURL(`https://discord.gg/kingmandev`),
      );
       let devloper = new MessageEmbed()
       .setTitle(`KINGMAN DEV`)
       .setDescription(`**Muhammad Kurkar**\n__**I am an undergraduate student from northeastern university**__
       `)
       .addFields(
        { name: '**\📱 PhoneNumber**', value: '+962792914245', inline: false },
        { name: '**\📶 GitHub**', value: '**[click here]( https://github.com/KMKINGMAN )**', inline: false },
        { name: '**\❤️ Discord Server**', value: '**[KINGMAN DEV]( https://discord.gg/kingmandev )**', inline: false },
       )
       .setFooter('KINGMAN DEV', 'https://c.top4top.io/p_1904h4sui1.png');
       kmsg.channel.send({
         embeds: [devloper], 
         components: [row]
       })
    }
 }