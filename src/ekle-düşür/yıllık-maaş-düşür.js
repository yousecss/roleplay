const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'yıllık-maaş-düşür',
  description: 'Belirli bir takımın yıllık maaşını düşürür.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('Bu komutu kullanma izniniz yok.');
    }
    if (args.length !== 2) {
      return message.channel.send('Kullanım: !yıllık-maaş-düşür @TakımRolü <Miktar>');
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
    const currentSalary = db.get(`salaries_${message.guild.id}_${roleId}`) || 0;

    if (currentSalary < amount) {
      return message.channel.send('Belirtilen miktar, takımın yıllık maaşından daha fazla.');
    }

    const updatedSalary = currentSalary - amount;
    if (updatedSalary <= 0) {
      db.delete(`salaries_${message.guild.id}_${roleId}`);
    } else {
      db.set(`salaries_${message.guild.id}_${roleId}`, updatedSalary);
    }

    const formattedAmount = new Intl.NumberFormat().format(amount);
    const formattedUpdatedSalary = new Intl.NumberFormat().format(updatedSalary || 0);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${mentionedRole.name} Takımının Yıllık Maaşı`)
      .setDescription(`${mentionedRole.name} takımının yıllık maaşı ${formattedAmount} € düşürüldü.\n Yeni yıllık maaş: ${formattedUpdatedSalary} €`)
      .setTimestamp(); 

    message.channel.send({ embeds: [embed] });
  },
};
