const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'transfer-bütçe-düşür',
  description: 'Belirli bir takımın transfer bütçesini düşürür.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('Bu komutu kullanma izniniz yok.');
    }
    if (args.length !== 2) {
      return message.channel.send('Kullanım: !transfer-bütçe-düşür @TakımRolü <Miktar>');
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

    if (currentTransferBudget < amount) {
      return message.channel.send('Belirtilen miktar, takımın transfer bütçesinden daha fazla.');
    }

    const updatedTransferBudget = currentTransferBudget - amount;
    if (updatedTransferBudget <= 0) {
      db.delete(`transfer-bütçe_${message.guild.id}_${roleId}`);
    } else {
      db.set(`transfer-bütçe_${message.guild.id}_${roleId}`, updatedTransferBudget);
    }

    const formattedAmount = new Intl.NumberFormat().format(amount);
    const formattedUpdatedTransferBudget = new Intl.NumberFormat().format(updatedTransferBudget || 0);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${mentionedRole.name} Takımının Transfer Bütçesi`)
      .setDescription(`${mentionedRole.name} takımının transfer bütçesinden ${formattedAmount} € düşürüldü.\n Yeni transfer bütçesi: ${formattedUpdatedTransferBudget} €`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
