const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'transfer-bütçe-ekle',
  description: 'Belirli bir takımın transfer bütçesine € ekler.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('Bu komutu kullanma izniniz yok.');
    }
    if (args.length !== 2) {
      return message.channel.send('Kullanım: !transfer-bütçe-ekle @TakımRolü <Miktar>');
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
    const currentTransferBudget = db.get(`transfer-bütçe_${message.guild.id}_${roleId}`) || 0;
    
    const updatedTransferBudget = currentTransferBudget + amount;
    db.set(`transfer-bütçe_${message.guild.id}_${roleId}`, updatedTransferBudget);

    const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${mentionedRole.name} Takımının transfer bütçesi`)
    .setDescription(`${mentionedRole.name} takımının transfer bütçesine ${amount} € eklenmiştir.\n Yeni transfer bütçesi: ${updatedTransferBudget || 0} €`)
      .setTimestamp();
  message.channel.send({ embeds: [embed] });
  },
};
