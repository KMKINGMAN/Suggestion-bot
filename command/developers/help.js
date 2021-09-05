const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "help",
    category: "dev",
    usage: [
      "Command"
    ],
    description : "to show help menu or help about some command",
    run: async(client, kmsg, args, prefix, KMSGC) => {
      if(!args[0]){
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
                if (cmd.ownerOnly && !owners.includes(kmsg.author.id)) return;
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
        return kmsg.channel.send({embeds: [embed]});
      } else {
        try {
            const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

            if (!cmd) {
                const noInfo = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ No information found for \`${args[0]}\``)
                return kmsg.channel.send({embeds: [noInfo]})
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
///
///
            info +=
                `**Category**: \`${cmd.category || 'No category.'}\`
                **Usage**: \n\`${prefix}${cmd.name} ${cmd.usage ? cmd.usage.join(`\n${prefix}${cmd.name} `): ""}\``;

            const helpEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${cmd.name} Command Info`, kmsg.author.displayAvatarURL({ dynamic: true }))
                .setDescription(info)
                .setFooter(`KINGMAN DEV SERVER`)
                .setTimestamp()
            return kmsg.channel.send({embeds: [helpEmbed]});
        } catch {
            const noInfo = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ No information found for \`${args[0]}\``)
            return kmsg.channel.send({embeds: [noInfo]})
        }
      } 
    }
}