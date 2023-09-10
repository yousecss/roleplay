const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const db = require('croxydb');

module.exports = {
  name: 'ping',
  description: 'Botun gecikmesini (ping) ölçer ve bakiyeyi gösterir.',
  çalıştırılıyor(message, args) {
    const ping = Math.round(message.client.ws.ping);

    const guildId = message.guild.id;
    const memberId = message.author.id;
    const currentBalance = db.get(`bakiye_${guildId}_${memberId}`) || 0;

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Gecikme Süreleri Aşşağıda Belirtildi!')
      .addField('Ping', `${ping} ms`, true)
      .addField('Mesaj Gecikme', `${currentBalance} ms`, true)
.setFooter('Bakiyeni öğrenme için butona bas')
      .setTimestamp();

    const showBalanceButton = new MessageButton()
      .setCustomId('show_balance')
      .setLabel('Bakiye')
      .setStyle('PRIMARY');

    const row = new MessageActionRow().addComponents(showBalanceButton);

    message.channel.send({ embeds: [embed], components: [row] });

    const filter = (interaction) => interaction.customId === 'show_balance';
    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (interaction) => {
      const updatedBalance = db.get(`bakiye_${guildId}_${memberId}`) || 0;
      const updatedEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setDescription(`${updatedBalance} € bakiyen bulunmaktadır.`)
        .setTimestamp();

      interaction.reply({ embeds: [updatedEmbed], ephemeral: true });
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
      }
    });
  },
};
