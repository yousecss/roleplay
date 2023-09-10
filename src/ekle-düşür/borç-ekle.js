const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'borç-ekle',
  description: 'Belirli bir takımın bütçesine € ekler.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('Bu komutu kullanma izniniz yok.');
    }
    if (args.length !== 2) {
      return message.channel.send('Kullanım: !bütçe-ekle @TakımRolü <Miktar>');
    }

    const mentionedRole = message.mentions.roles.first();
    if (!mentionedRole) {
      return message.channel.send('Belirtilen rol bulunamadı.');
    }

    const rawAmount = args[1].replace(/,/g, '');
    const amount = parseInt(rawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      return message.channel.send('Geçerli bir miktar belirtmelisiniz.');
    }
    const roleId = mentionedRole.id;
    const currentBudget = db.get(`borc_${message.guild.id}_${roleId}`) || 0;
    db.set(`borc_${message.guild.id}_${roleId}`, currentBudget + amount);

    const formattedAmount = new Intl.NumberFormat().format(amount);
    const formattedDebt = new Intl.NumberFormat().format(currentBudget + amount);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${mentionedRole.name} Takımının Borcu`)
      .setDescription(`${mentionedRole.name} takımının borcuna ${formattedAmount} € eklendi.\n Yeni borç: ${formattedDebt} €`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
