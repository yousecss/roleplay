const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'bütçe-ekle',
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

    const amount = parseInt(args[1]);
    if (isNaN(amount) || amount <= 0) {
      return message.channel.send('Geçerli bir miktar belirtmelisiniz.');
    }
    const roleId = mentionedRole.id;
    const currentBudget = db.get(`budgets_${message.guild.id}_${roleId}`) || 0;
    db.set(`budgets_${message.guild.id}_${roleId}`, currentBudget + amount);

    const updatedBudget = db.get(`budgets_${message.guild.id}_${roleId}`);

    const formattedBudget = new Intl.NumberFormat().format(updatedBudget);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${mentionedRole.name} Takımının bütçesi`)
      .setDescription(`${mentionedRole.name} takımının bütçesi ${formattedBudget} €`)
      .setTimestamp(); 

    message.channel.send({ embeds: [embed] });
  },
};
