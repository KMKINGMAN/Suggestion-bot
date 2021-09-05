const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"),
GUILDMODAL = require('../../Modals/suggestion/main');
module.exports = {
  name: "help",
  description: "to set suggestion channel",
  type: "CHAT_INPUT",
  options: [
    {
      name: "command",
      description: "command name",
      type: 3,
      required: false,
    },
  ],
  run: async (client, err , send, interaction) => {
        let prefix = '/'
        const options = interaction.options._hoistedOptions;
        let data = options.find((e) => e.name === "command")
        if(!data){
         const { commands, owners } = client;
        const categories = new Set();
        const fields = [];
        commands.forEach((cmd) => {
            const cmdCategory = cmd.category || "No category";
            categories.add(cmdCategory);
        });
        Array.from(categories).sort()
        categories.forEach((cat) => {
            const field = [];
            commands.forEach((cmd) => {
                if (cmd.ownerOnly && !owners.includes(interaction.member.user.id)) return;
                if (!cmd.category && cat == "No category")
                    field.push(cmd);
                if (cmd.category == cat) field.push(cmd);
            });
            let fieldName = `${cat} Commands [${field.length}]`
            if (cat.toLowerCase().includes('command')) fieldName = `${cat} [${field.length}]`
            fields.push({
                name: fieldName,
                value: field.map((cmd) => `**\`${prefix}${cmd.name}\`: ${cmd.description ? cmd.description : ""}**`).join("\n"),
                inline: false,
            });
        });
        const embed = new MessageEmbed()
            .setAuthor(`${client.user.username} Commands List`, client.user.displayAvatarURL())
            .setDescription(`**Use \`${prefix}${module.exports.name} <command>\` to get more info on a command.**`)
            .addFields(fields)
            .setFooter(`KINGMAN DEV SERVER`)
            .setTimestamp()
            .setColor('GOLD')
        return interaction.reply({embeds: [embed]});
      } else {
        try {
            const cmd = client.commands.get(data.value.toLowerCase()) || client.commands.get(client.aliases.get(data.value.toLowerCase()));

            if (!cmd) {
                const noInfo = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ No information found for \`${data.value}\``)
                return interaction.reply({embeds: [noInfo]})
            }

            let info = `**Description:** \`${cmd.description || 'No description.'}\`\n`;

            if (cmd.aliases)
                info += `**Aliases**: ${cmd.aliases.map((a) => `\`${a}\``).join(", ")}\n`;

            if (cmd.examples)
                info += `**Examples**: ${cmd.examples.map((a) => `\`${prefix + a}\``).join(", ")}\n`;

            if (cmd.cooldown)
                info += `**Cooldown**: \`${cmd.cooldown}\`\n`;

            if (cmd.example)
                info += `**Example**: \`${prefix + cmd.example}\`\n`;
            info +=
                `**Category**: \`${cmd.category || 'No category.'}\`
                **Usage**: \n\`${prefix}${cmd.name} ${cmd.usage ? cmd.usage.join(`\n${prefix}${cmd.name} `): ""}\``;

            const helpEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${cmd.name} Command Info`, interaction.member.user.displayAvatarURL({ dynamic: true }))
                .setDescription(info)
                .setFooter(`KINGMAN DEV SERVER`)
                .setTimestamp()
            return interaction.reply({embeds: [helpEmbed]});
        } catch {
            const noInfo = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ No information found for \`${data.value}\``)
            return interaction.reply({embeds: [noInfo]})
        }
      } 
  }
}