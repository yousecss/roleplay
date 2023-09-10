const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'borç-düşür',
  description: 'Belirli bir takımın borcunu düşürür.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('Bu komutu kullanma izniniz yok.');
    }
    if (args.length !== 2) {
      return message.channel.send('Kullanım: !borç-düşür @TakımRolü <Miktar>');
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
    const currentDebt = db.get(`borc_${message.guild.id}_${roleId}`) || 0;

    if (currentDebt < amount) {
      return message.channel.send('Belirtilen miktar, takımın borcundan daha fazla.');
    }

    const updatedDebt = currentDebt - amount;
    if (updatedDebt <= 0) {
      db.delete(`borc_${message.guild.id}_${roleId}`);
    } else {
      db.set(`borc_${message.guild.id}_${roleId}`, updatedDebt);
    }

    const formattedAmount = new Intl.NumberFormat().format(amount); 
    const formattedUpdatedDebt = new Intl.NumberFormat().format(updatedDebt || 0);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${mentionedRole.name} Takımının Borcu`)
      .setDescription(`${mentionedRole.name} takımının borcundan ${formattedAmount} € düşürüldü.\n Yeni borç: ${formattedUpdatedDebt} €`)
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  },
};
